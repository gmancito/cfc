# DDEV for local development

Follow the https://ddev.readthedocs.io/en/stable/#installation instructions, you will need docker pre-installed.

- Download the windows exe from https://github.com/drud/ddev/releases

## Database Import

Follow https://ddev.readthedocs.io/en/stable/users/cli-usage/#database-imports

- Run `ddev import-db --src=tampacfc_tcfc.sql`

NOTE: Edit `settings.ddev.php` and add the `'prefix' => "tcfc_",` to the database settings to match the database.

`Run`ddev start`

** Visit http://cfc.ddev.local:8080/ to see the site **

![alt text](https://raw.githubusercontent.com/gmancito/cfc/blob/master/ddev-setup.jpg "Setup")
