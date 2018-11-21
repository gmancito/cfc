@ECHO ON
rmdir /Q /S "web/includes"
rmdir /Q /S "web/misc"
rmdir /Q /S "web/modules"
rmdir /Q /S "web/profiles"
rmdir /Q /S "web/scripts"
rmdir /Q /S "web/themes"
cd web
del ".editorconfig"
del "authorize.php"
del "CHANGELOG.txt"
del "COPYRIGHT.txt"
del "cron.php"
del "index.php"
del "install.php"
del "INSTALL.mysql.txt"
del "INSTALL.pgsql.txt"
del "INSTALL.sqlite.txt"
del "INSTALL.txt"
del "LICENSE.txt"
del "MAINTAINERS.txt"
del "PATCHES.txt"
del "README.txt"
del "update.php"
del "UPGRADE.txt"
del "xmlrpc.php"
ECHO Remember to restore the includes/database/sqlsrv drivers after copying new core
ECHO Remember to apply patches such as DBLOG patches
PAUSE
