<!-- 
author: Kelvin You
title: NVM for Windows - How to Download and Install Node Version Manager (NVM) in Windows
create date: 2/12/2023
modify date: 2/12/2023 
-->


# NVM for Windows - How to Download and Install Node Version Manager (NVM) in Windows

![NVM Windows from https://www.freecodecamp.org/](/public/images/blog/2/nvmWindows.png)

Doesn't Windows have "NVM"? Because NVM is only supported on Linux and Mac? No! There is also a Node Version Manager (NVM) for Windows too!

## Follow the steps below to download nvm-windows

* **Step 1:** Head over to the [nvm-windows repository](https://github.com/coreybutler/nvm-windows#installation--upgrades) and click on "Download Now!"
![alt text](/public/images/blog/2/download.png)

* **Step 2:** Scroll down and click on the latest version to download
![alt text](/public/images/blog/2/download-exe.png)

* **Step 3:** Locate the installer on your computer and open it. Follow the installation wizard to install it

* **Step 4:** Open up PowerShell or Command Prompt and run `nvm -v` to confirm the installation.

  ```bash
    nvm -v
  ```

## Example Usage
![Example Usage](/public/images/blog/2/main.png)


## Tips And Tricks

```bash
  nvm arch                     : Show if node is running in 32 or 64 bit mode.
  nvm current                  : Display active version.
  nvm debug                    : Check the NVM4W process for known problems (troubleshooter).
  nvm install <version> [arch] : The version can be a specific version, "latest" for the latest current version, or "lts" for the
                                 most recent LTS version. Optionally specify whether to install the 32 or 64 bit version (defaults
                                 to system arch). Set [arch] to "all" to install 32 AND 64 bit versions.
                                 Add --insecure to the end of this command to bypass SSL validation of the remote download server.
  nvm list [available]         : List the node.js installations. Type "available" at the end to see what can be installed. Aliased as ls.
  nvm on                       : Enable node.js version management.
  nvm off                      : Disable node.js version management.
  nvm proxy [url]              : Set a proxy to use for downloads. Leave [url] blank to see the current proxy.
                                 Set [url] to "none" to remove the proxy.
  nvm node_mirror [url]        : Set the node mirror. Defaults to https://nodejs.org/dist/. Leave [url] blank to use default url.
  nvm npm_mirror [url]         : Set the npm mirror. Defaults to https://github.com/npm/cli/archive/. Leave [url] blank to default url.
  nvm uninstall <version>      : The version must be a specific version.
  nvm use [version] [arch]     : Switch to use the specified version. Optionally use "latest", "lts", or "newest".
                                 "newest" is the latest installed version. Optionally specify 32/64bit architecture.
                                 nvm use <arch> will continue using the selected version, but switch to 32/64 bit mode.
  nvm root [path]              : Set the directory where nvm should store different versions of node.js.
                                 If <path> is not set, the current root will be displayed.
  nvm [--]version              : Displays the current running version of nvm for Windows. Aliased as v.
```