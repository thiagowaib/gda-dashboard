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
    <script src="<?= get_template_directory_uri(); ?>/script.js" type="module" defer></script>
    <title><?= bloginfo('description'); ?></title>
</head>
<body>
    <div id="map"></div>

    <?php 
        $uploadPath = FileSystem::getUpload();
        if($uploadPath !== null) {
            $file = fopen($uploadPath, "r");
            for($i = 0; ($line = fgetcsv($file)) !== FALSE; $i++) {
                if($i===0) continue;
                echo Medida::newFromArray($line)->toHTMLDocument();
            }
            fclose($file);
        }
    ?>
</body>
</html>