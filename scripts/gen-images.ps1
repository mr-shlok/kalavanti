# Generates on-brand placeholder JPEGs into public/img using System.Drawing.
# No network access required. Run: powershell -ExecutionPolicy Bypass -File scripts/gen-images.ps1
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root 'public\img'
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

# Brand palette
$plum  = [System.Drawing.Color]::FromArgb(255, 44, 27, 69)    # #2C1B45
$mauve = [System.Drawing.Color]::FromArgb(255, 138, 124, 153) # #8A7C99
$gold  = [System.Drawing.Color]::FromArgb(255, 180, 140, 70)
$white = [System.Drawing.Color]::White

function New-Linear([System.Drawing.Rectangle]$r, $c1, $c2, $deg) {
  $b = New-Object System.Drawing.Drawing2D.LinearGradientBrush($r, $c1, $c2, [single]$deg)
  $b.WrapMode = 'TileFlipX'
  return $b
}

function Save-Jpg([System.Drawing.Bitmap]$bmp, [string]$path, [int]$quality) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  $bmp.Save($path, $codec, $ep)
  $bmp.Dispose()
}

function New-Image([string]$label, [int]$w, [int]$h) {
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.TextRenderingHint = 'AntiAliasGridFit'
  $g.InterpolationMode = 'HighQualityBicubic'

  [single]$sw = $w; [single]$sh = $h
  [single]$cx = $sw / 2; [single]$cy = $sh / 2

  # Diagonal gradient background (plum -> mauve)
  $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
  $brush = New-Linear $rect $plum $mauve 45
  $g.FillRectangle($brush, $rect); $brush.Dispose()

  # Concentric monogram circles
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(40,255,255,255), [single]2)
  $maxR = [Math]::Min($sw, $sh)
  for ([single]$r = 40; $r -lt $maxR; $r += 46) { $g.DrawEllipse($pen, $cx - $r, $cy - $r, $r * 2, $r * 2) }
  $pen.Dispose()

  # Gold diamond accent
  [single]$d = $maxR * 0.07
  [single]$dy = $cy - $maxR * 0.17
  $pts = [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($cx, ($dy - $d)),
    [System.Drawing.PointF]::new(($cx + $d), $dy),
    [System.Drawing.PointF]::new($cx, ($dy + $d)),
    [System.Drawing.PointF]::new(($cx - $d), $dy)
  )
  $gb = New-Object System.Drawing.SolidBrush($gold)
  $g.FillPolygon($gb, $pts); $gb.Dispose()

  # Centered label (auto-fit down if too wide)
  [single]$fontSize = [Math]::Max(24, $sw * 0.05)
  $font = New-Object System.Drawing.Font('Georgia', $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = 'Center'; $sf.LineAlignment = 'Center'
  $layout = New-Object System.Drawing.RectangleF([single]24, ($cy - $sh*0.05), ($sw - [single]48), ($sh * [single]0.24))
  $wb = New-Object System.Drawing.SolidBrush($white)
  $sh2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(120,0,0,0))
  $shadowLayout = New-Object System.Drawing.RectangleF([single]26, ($cy - $sh*0.05 + [single]2), ($sw - [single]48), ($sh * [single]0.24))
  $g.DrawString($label, $font, $sh2, $shadowLayout, $sf)
  $g.DrawString($label, $font, $wb, $layout, $sf)
  $font.Dispose(); $wb.Dispose(); $sh2.Dispose(); $sf.Dispose()

  # Brand tag bottom-right
  $tagFont = New-Object System.Drawing.Font('Georgia', [Math]::Max([single]12, $sh*0.03), [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $tb = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(160,255,255,255))
  $g.DrawString('KALAVANTI', $tagFont, $tb, [single]($w - 170), [single]($h - 46))
  $tagFont.Dispose(); $tb.Dispose()

  $g.Dispose()
  return $bmp
}

# filename -> display label
$map = [ordered]@{
  'p-ring-solitaire'='Solitaire Ring'; 'p-ring-cluster'='Cluster Diamond Ring'; 'p-ring-gold'='Temple Gold Ring'
  'p-ring-emerald'='Emerald Ring'; 'p-ring-platinum-band'='Platinum Band'; 'p-ring-couple'='Couple Bands'
  'p-ear-studs'='Diamond Studs'; 'p-ear-hoops'='Huggie Hoops'; 'p-ear-chandelier'='Chandelier Earrings'
  'p-ear-jhumka'='Gold Jhumkas'; 'p-ear-pearl-drop'='Pearl Drops'
  'p-neck-diamond'='Diamond Necklace'; 'p-neck-ranihaar'='Ranihaar Necklace'; 'p-neck-bridal-set'='Bridal Set'; 'p-neck-choker'='Velvet Choker'
  'p-pend-diamond'='Diamond Pendant'; 'p-pend-ruby'='Ruby Pendant'
  'p-brace-tennis'='Tennis Bracelet'; 'p-brace-kada'='Gold Kada'; 'p-brace-charm'='Charm Bracelet'
  'p-bang-gold-set'='Gold Bangles'; 'p-bang-polki'='Polki Bangles'
  'p-chain-gold'='Gold Chain'; 'p-chain-white'='White-Gold Chain'
  'p-orn-mangtika'='Maang Tikka'; 'p-orn-nosepin'='Nath Nosepin'; 'p-gold-coin'='Gold Coin'
  't-earrings'='Earrings'; 't-rings'='Rings'; 't-necklaces'='Necklaces'; 't-pendants'='Pendants'
  't-bracelets'='Bracelets'; 't-bangles'='Bangles'; 't-chains'='Chains'; 't-ornaments'='Ornaments'
  'cat-diamond'='Diamond Jewellery'; 'cat-gold'='Gold Jewellery'; 'cat-platinum'='Platinum Jewellery'
  'cat-gemstone'='Gemstone Jewellery'; 'cat-bridal'='Bridal'; 'cat-gifting'='Gifting'
  'hero-diamond'='Timeless Diamonds'; 'hero-bridal'='Bridal Heirlooms'; 'hero-festive'='Festive Sparkle'
  'banner-bridal'='The Bridal Atelier'; 'banner-atelier'='Inside the Atelier'
}

$wide = @('hero-diamond','hero-bridal','hero-festive','banner-bridal')

$count = 0
foreach ($name in $map.Keys) {
  $label = $map[$name]
  if ($wide -contains $name)          { $bmp = New-Image $label 1600 900 }
  elseif ($name -eq 'banner-atelier') { $bmp = New-Image $label 900 1200 }
  else                                { $bmp = New-Image $label 1000 1000 }
  Save-Jpg $bmp (Join-Path $outDir "$name.jpg") 88
  $count++
}

Write-Output "Generated $count images into $outDir"
