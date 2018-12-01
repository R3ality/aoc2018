$In = Get-Content "input.txt"
$Res = $Index = 0
$Hasht = @{}
while ($true) {
    If ($Index -gt ($In.Count-1)) { $Index = 0 }
    $Res += $In[$Index]
    If ($Hasht.ContainsKey($Res)) { Write-Host "First recurring frequency is" $Res; Break }
    $Hasht.add($Res, $true)
    $Index++
}

<#
# Original approach below was using an Array. This was crazy slow.
# In case of $Arr -contains $Res the solution took around 1163,449 seconds.
# $Arr.Contains($Res) was much faster at 752,417 seconds, but obviously still not close to being reasonable
# Hashtable key approach above took around 1,2 seconds for the solution

$In = Get-Content "input.txt"
$Res = $Index = 0
$Arr = @()
while ($true) {
    If ($Index -gt ($In.Count-1)) { $Index = 0 }
    $Res += $In[$Index]
    If ($Arr.Contains($Res)) { Write-Host "First recurring frequency is" $Res; Break }
    $Arr += $Res
    $Index++
}
#>