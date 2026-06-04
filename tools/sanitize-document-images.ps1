param(
  [string]$SourceRoot = "documents",
  [string]$OutputRoot = "public/documents"
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

Add-Type -ReferencedAssemblies "System.Drawing" -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public static class DocumentImageSanitizer
{
    private static bool IsBiopeptideBlue(byte r, byte g, byte b)
    {
        bool saturatedBlue = b > r + 18 && g > r + 4 && b > 105 && g > 85;
        bool saturatedTeal = g > r + 22 && b > r + 10 && g > 100 && b > 100;
        bool paleWatermark = r > 140 && g > 145 && b > 155 && b > r + 5;
        bool faintWatermark = r > 188 && g > 188 && b > 188 && b >= r - 10 && g >= r - 14;
        return saturatedBlue || saturatedTeal || paleWatermark || faintWatermark;
    }

    public static void Process(string inputPath, string outputPath)
    {
        using (var source = new Bitmap(inputPath))
        using (var bitmap = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb))
        {
            using (var g = Graphics.FromImage(bitmap))
            {
                g.Clear(Color.White);
                g.DrawImageUnscaled(source, 0, 0);
            }

            var rect = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
            var data = bitmap.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            int length = Math.Abs(data.Stride) * bitmap.Height;
            byte[] pixels = new byte[length];
            Marshal.Copy(data.Scan0, pixels, 0, length);

            for (int y = 0; y < bitmap.Height; y++)
            {
                int row = y * data.Stride;
                for (int x = 0; x < bitmap.Width; x++)
                {
                    int index = row + (x * 4);
                    byte b = pixels[index];
                    byte g = pixels[index + 1];
                    byte r = pixels[index + 2];

                    if (IsBiopeptideBlue(r, g, b))
                    {
                        pixels[index] = 255;
                        pixels[index + 1] = 255;
                        pixels[index + 2] = 255;
                        pixels[index + 3] = 255;
                    }
                }
            }

            Marshal.Copy(pixels, 0, data.Scan0, length);
            bitmap.UnlockBits(data);

            using (var g = Graphics.FromImage(bitmap))
            using (var titleFont = new Font("Arial", Math.Max(28, bitmap.Height * 0.038f), FontStyle.Bold, GraphicsUnit.Pixel))
            using (var subFont = new Font("Arial", Math.Max(7, bitmap.Height * 0.010f), FontStyle.Bold, GraphicsUnit.Pixel))
            using (var orange = new SolidBrush(Color.FromArgb(240, 68, 35)))
            using (var black = new SolidBrush(Color.FromArgb(20, 20, 20)))
            using (var white = new SolidBrush(Color.White))
            {
                g.TextRenderingHint = System.Drawing.Text.TextRenderingHint.AntiAliasGridFit;
                int logoBottom = Math.Min((int)(bitmap.Height * 0.105), 124);
                g.FillRectangle(white, 0, 0, bitmap.Width, logoBottom);

                string left = "IVEXIA";
                string right = " PEPTIDE";
                SizeF leftSize = g.MeasureString(left, titleFont);
                SizeF rightSize = g.MeasureString(right, titleFont);
                float totalWidth = leftSize.Width + rightSize.Width;
                float startX = (bitmap.Width - totalWidth) / 2f;
                float titleY = Math.Max(18, logoBottom * 0.28f);

                g.DrawString(left, titleFont, black, startX, titleY);
                g.DrawString(right, titleFont, orange, startX + leftSize.Width, titleY);

                string tagline = "HIGHLY PURIFIED PEPTIDES";
                SizeF taglineSize = g.MeasureString(tagline, subFont);
                g.DrawString(tagline, subFont, black, (bitmap.Width - taglineSize.Width) / 2f, titleY + leftSize.Height + 4);

                int markSize = Math.Max(18, (int)(bitmap.Height * 0.03));
                float markX = startX - markSize - 12;
                float markY = titleY + (leftSize.Height - markSize) / 2f;
                using (var markPen = new Pen(Color.FromArgb(240, 68, 35), Math.Max(3, markSize / 6)))
                {
                    g.DrawEllipse(markPen, markX, markY, markSize, markSize);
                    g.DrawArc(markPen, markX + markSize * 0.12f, markY + markSize * 0.12f, markSize * 0.76f, markSize * 0.76f, 35, 250);
                }
            }

            Directory.CreateDirectory(Path.GetDirectoryName(outputPath));
            bitmap.Save(outputPath, ImageFormat.Png);
        }
    }
}
"@

$sourcePath = (Resolve-Path -LiteralPath $SourceRoot).Path.TrimEnd('\', '/')
$outputPath = Join-Path (Get-Location) $OutputRoot
$files = Get-ChildItem -LiteralPath $sourcePath -Recurse -File |
  Where-Object { $_.Extension -match '^\.(png|jpg|jpeg|webp)$' }

foreach ($file in $files) {
  $relativePath = $file.FullName.Substring($sourcePath.Length).TrimStart('\', '/')
  $destination = Join-Path $outputPath $relativePath
  [DocumentImageSanitizer]::Process($file.FullName, $destination)
}

Write-Host "Sanitized $($files.Count) document images into $OutputRoot"
