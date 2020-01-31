#!/bin/bash

packages="xclip wine64"

for package in $packages
do
	which $package 2>/dev/null 1>/dev/null
	if [ $? -ne 0 ]; then
	    apt-get install "$package" -y 2>/dev/null 1>/dev/null
		if [ $? -ne 0 ]; then
			  echo "Please run this script with sudo permissions.";
			  exit
		  else
			  echo -e "Required package $package was succesfully installed.";
		fi
	fi
done


which il2 2>/dev/null 1>/dev/null
	if [ $? -ne 0 ]; then
		read -p "Please enter path to the il2cpp dumper executable: `echo $'\n> '`"  il2path
		echo "wine64 $il2path $(echo '$1' '$2' '$3' '$4')" > il2 2>/dev/null 1>/dev/null
		touch /usr/bin/TestFileToCheckPermissions 2>/dev/null
			if [ $? -ne 0 ]; then
				echo "Please run the script with sudo permissions.";
			else
				touch il2; chmod +x il2; 
				echo "wine64 $il2path $(echo '$1' '$2' '$3' '$4')" > il2
		                mv il2 /usr/bin/il2 2>/dev/null 1>/dev/null
				rm /usr/bin/TestFileToCheckPermissions;
				echo -e "Requirements were successfully installed. Please run the script again as a normal user.";
				exit	
			fi
	else
		clear && echo -e "Directories found in $(pwd):\n"; ls -ltraF | awk '{print $9}' | egrep ".*\/" | egrep -v "(\.\/|\.\.\/)"
		read -p "Please enter App's folder name, e.g. folder is named \"AppName.app\", you should type AppName. `echo $'\n> '`"  target;
		cp $target.app/Data/unity* ./VersionFile
		strings VersionFile | head -n1 | xclip -sel primary;
		il2 $target.app/$target $target.app/Data/Managed/Metadata/global-metadata.dat $(xclip -o) 3;
		rm VersionFile;
		exit;
	fi

