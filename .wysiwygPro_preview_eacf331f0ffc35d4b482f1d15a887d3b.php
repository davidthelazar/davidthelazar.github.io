<?php
if ($_GET['randomId'] != "pNWYO6jsuEGucmB3gsN6bs6jCdm0HmcFnoyt9KvFXISC5sbiyB6ECSy5p06NQoIC") {
    echo "Access Denied";
    exit();
}

// display the HTML code:
echo stripslashes($_POST['wproPreviewHTML']);

?>  
