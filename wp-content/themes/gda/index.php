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

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">


    <link rel="stylesheet" href="<?= get_stylesheet_directory_uri(); ?>/styles/reset.css"/>
    <link rel="stylesheet" href="<?= get_stylesheet_directory_uri(); ?>/styles/fonts.css"/>
    <link rel="stylesheet" href="<?= get_stylesheet_directory_uri(); ?>/style.css"/>
    
    <script src="<?= get_template_directory_uri(); ?>/script.js" type="module" defer></script>
    
    <title><?= bloginfo('description'); ?></title>
</head>
<body>
    <section id="map-section">
        <header>
            <div class="major-mono">
                <h2>projeto</h2>
                <h1>cuidadores das Águas</h1>
            </div>
        </header>

        <div id="map"></div>
        <footer>

        </footer>
    </section>

    <section id="data-section">
        <button id="btn-close-data-section">x</button>
        <h1 id="data-point-description"></h1>
        <div>
            <h2 id="data-date-description"></h2>
            <a id="data-previous">&#10094;</a>
            <div id="data-table-anchor"></div>
            <a id="data-next">&#10095;</a>
            <div class="data-dot-container">
                <!-- <span class="carrousel-dot"></span> -->
            </div>
        </div>
    </section>

    

    <?php 
        $uploadPath = FileSystem::getUpload();
        if($uploadPath !== null) {
            echo '<div style="display:none;">';
            $file = fopen($uploadPath, "r");
            for($i = 0; ($line = fgetcsv($file)) !== FALSE; $i++) {
                if($i===0) continue;
                echo Medida::newFromArray($line)->toHTMLDocument();
            }
            fclose($file);
            echo '</div>';
        }
    ?>
</body>
</html>