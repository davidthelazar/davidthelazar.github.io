<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'davidthe_wp');

/** MySQL database username */
define('DB_USER', 'davidthe_wp');

/** MySQL database password */
define('DB_PASSWORD', 'vy2b1SPa43');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'lcoln6k8ezbbbuwomq1mtabkio7bue2xomy0xvjoy0bzdhywny803xft5mu5sfr9');
define('SECURE_AUTH_KEY',  'x78nfsdhtjxweuvgxa0ytcfah2k8eojulcws4teloz5rnz31pzo7k19s77srdtxf');
define('LOGGED_IN_KEY',    'mwzkrpzqqlyrwp0hck3rlm96fxf0fur47nphcreg9vowkz25zjwlldkgx5mg5epa');
define('NONCE_KEY',        'apkg3rhl66eydhuej5rpvc8jt9chdk4ow2b6qagew0kjgiy7dmoutdlssfwkbmtb');
define('AUTH_SALT',        'yilplsbjgew9v9zpoc1xrozh0m9lxotla3bqvsbtarbw17mlyy3091cbhj2lfesv');
define('SECURE_AUTH_SALT', 'pwvawhobyqducrxcjurgk6aw7eizaggwnunqyzw2robuogspvvazyveit40wjeyz');
define('LOGGED_IN_SALT',   'rfvsalxxw3vo7tfhkmylwxmnsrwi10qqiwruuqj9cj51a8zgtranehosiqdrpgu6');
define('NONCE_SALT',       'bwowevtdvzlf7lfireyjozo4bxdculd7em0q67qyaytsmmf27ckox0obasenjrct');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress.  A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define ('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
