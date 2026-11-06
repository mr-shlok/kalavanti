$ErrorActionPreference = 'Continue'
$slugs = @(
  # rings
  'yEJwDxAoHc0','Ce18NWJmA_Y','Y_bxfTa_iUA','SBSeFdJouZU','9_35SjwzpnU','zZLhoEwGCeM','EsjkVKMdN_I','NhrcL_C0sFA','CSOOFjnVeiI','d5qU27rehlk','1w1FQagKes4','9poB8SBFveA',
  # earrings
  '-_12be3InkQ','n6bbbc3Oc-w','Asngw4A5_tM','rC5XvnWueMA','RIqNLZ_h2X8','Lqfqsij4EvQ','8bJKF2famIk','lsxBmX8Hmwc','N2n0VR-jdJ0','ttMO9io6uMY','e7KQ0yocfRE','GKbfUFna-9I',
  # necklaces / chains
  'vbsN7MUXyT4','HiGJ04wtX4w','G3Hrl6WzQYQ','0ziihuUXMcs','Z0GZrpwcc5Y','_Ycmc96ZxWM','KC2nQ6JjQLk','wcM6IweGBmw','L-rNkUK2SZU','y2ErhoE92KA','dvqdAgt1HwU','aldDZePniqg','TmOPo7TpLzw',
  # bangles / bracelets
  'AoZrJQ80KCc','8angSQtYgKc','-nKCbZlOHek','itriu-lCKzs','wreS7kv_tLE','qoGdi3R3ekQ','zz6-LqiW4mY','66D6YWDSK58','2EF7dcbdZAI','xQ9HeP870EE','YtqZQpzJQEY','GBFHG4SpAfg','kO7Wlx8XFmM',
  # pendants
  'u1Hv_erOQH0','CmmYT6Mm948','ZoDgJpXzDB8','AhIQL2CKq7g','S_yzr-bA92Y','xu_zM4np434','eTVe9uwYV84','p559uKMrQVA',
  # bridal / lifestyle
  'VPwSJhu5uhs','zW7hVlt6Oa0','KxHcyNOIO_M','jQ3UdoWiFis','T-PUQaJ8YEw','aXSyDSydIjU','ycN9bB8J6LM','Tu-aK8z8nQI','ACAHBwOsRSM','NsH-CvU0deg','-GhLgB-oXNw','UClA1D4IaWU','fbudv1NPC4M','pm7zFyyLUuk','3NcloKhQt-c','woIA_Sjo9hE',
  # coins
  'y7jRMXz7pE','8t9c3ET7_Ts','aJKaSKzUI5Q','Mx3tCAyN0vI','uG3sjycquog','CrKbgIUG_lM',
  # gift boxes
  'L99DoqmExQE','6JtuGvLzh20','ayUGdxRvjV4','rR59irzeUl0','vqj5A4C7v_A'
)
$out = foreach ($s in $slugs) {
  $u = & curl.exe -s -o 'NUL' -I -L --max-time 15 -w '%{url_effective}' "https://unsplash.com/photos/$s/download"
  "$s|$u"
}
$out | Set-Content -Path 'c:\Users\jrasi\OneDrive\Desktop\Website\jwellery\jwellery\resolved-urls.txt' -Encoding UTF8
Write-Output "DONE $($out.Count)"
