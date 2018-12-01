$In = Get-Content "input.txt"
$Res = $Index = 0
$Arr = @()
while ($true) {
    If ($Index -gt ($In.Count-1)) { $Index = 0 }
    $Res += $In[$Index]
    If ($Arr -contains $Res) { Write-Host "First recurring frequency is" $Res; Break }
    $Arr += $Res
    $Index++
}