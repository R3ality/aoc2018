$in = (gc input.txt) -split '\n'
foreach ($i in $in) {
    $i -split '' | sort | group | select -Skip 1 | ? { $_.Count -gt 1 } | group Count | % {
        if ($_.Name -eq 2) { $two++ } else { $three++ }
    }
}
$two * $three

<#
# Less condensed and more readable
#$in = "bababc" # DEBUG
$in = (Get-Content input.txt) -split '\n'
foreach ($i in $in) {
    $i -split '' | Sort-Object | Group-Object -NoElement | Select-Object -Skip 1 | Where-Object { $_.Count -gt 1 } | Group-Object -Property Count -NoElement | ForEach-Object {
        if ($_.Name -eq 2) { $two++ }
        elseif ($_.Name -eq 3) { $three++ }
    }
}
Write-Host "two:" $two "three:" $three "solution:" ($two * $three)
#>
