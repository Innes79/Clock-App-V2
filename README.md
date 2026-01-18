HOW TO RUN THE APPLICATION ON WINDOWS

Important note

you either install it via thesee instructions or you use the installer under the section "releases" both versions are both minimisable, resizable and tell the correct time

option for .exe installer

https://github.com/Innes79/Clock-App-V2/releases/tag/v1.1.0

Option for manual install

Install node.js and git from their websites

Go into your terminal and type “cd documents”

Clone the repository, immediately after going into the documents folder copy and paste this “git clone https://github.com/Innes79/Clock-App-V2.git”

Go into the folder that was created should be named, if not find it in the directory you cloned the repository to “cd Clock-App-V2”

Go onto a fresh windows powershell but run it as administrator and paste this in and then type y and enter “Set-ExecutionPolicy RemoteSigned -Scope CurrentUser”

An alternative to step 5 is, type this into your current powershell, doesn't have to be administrator, whatever one works for you “Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process”

Once in type this (if an update is needed input the command that it gives you for me it was)“npm i -g pnpm”

After doing step 7 run this (if it gives you a warning with a yellow box around it run the command it gives you to pick the dependencies then press a to toggle them all and then enter to select, finally type the letter y to confirm) “pnpm approve-builds”

To confirm the operation went smooth type this to confirm “pnpm i”

Finally to run everything type and after a few seconds the application should appear (if the application does not appear minimise your windows and see if it is on your desktop) “pnpm start”
