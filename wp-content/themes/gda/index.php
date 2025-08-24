<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>

    <link rel="stylesheet" href="<?= get_stylesheet_directory_uri(); ?>/style.css"/>
    <script src="<?= get_template_directory_uri(); ?>/script.js" defer></script>
    <title><?= bloginfo('description'); ?></title>
</head>
<body>
    <div id="map"></div>

    <?php 
        $mediaPath = null;
        $args = array(
            'post_type' => 'attachment',
            'numberposts' => -1,
            'post_status' => null,
            'post_parent' => null, // any parent
            ); 
        $attachments = get_posts($args);
        if ($attachments) {
            foreach ($attachments as $attachment) {
                setup_postdata($attachment);
                $mediaPath = get_attached_file($attachment->ID);
                if(strpos(strtoupper($mediaPath), "CSV") !== FALSE) {
                    break;
                } else {
                    $mediaPath = null;
                    continue;
                }
            }
        }

        if($mediaPath !== null) {
            $file     = fopen($mediaPath, "r");
            $i = 0;
            while (($line = fgetcsv($file)) !== FALSE) {
                // Line #0 = HEADER
                // Line #1 ... #n = DATA 
                // array: column order => data
                print_r($line);
                echo "<br>";
                $i ++;
            }

            fclose($file);
        }
    ?>
</body>
</html>