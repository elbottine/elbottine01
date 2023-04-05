Set oShell = WScript.CreateObject ("WScript.Shell")

oShell.CurrentDirectory = "C:\vsts\BOTINNE02\bottine-fe\api"
oShell.run "cmd.exe /C code ."
oShell.run "cmd.exe /C npm run build"

oShell.CurrentDirectory = "C:\vsts\BOTINNE02\bottine-fe"
oShell.run "cmd.exe /C code ."
oShell.run "cmd.exe /C npm run build"

'MsgBox "Hello, World!", 1+16, "MsgBox Example"

WScript.Sleep 15000

oShell.CurrentDirectory = "C:\vsts\BOTINNE02\bottine-fe\api"
oShell.run "cmd.exe /K func start"

oShell.CurrentDirectory = "C:\vsts\BOTINNE02\bottine-fe"
oShell.run "cmd.exe /K npm run start2"

WScript.Quit 0

'REM pause
'REM start "api" swa start http://localhost:4200 --api-location api
