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
    <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />


    <link rel="stylesheet" href="<?= get_stylesheet_directory_uri(); ?>/styles/reset.css"/>
    <link rel="stylesheet" href="<?= get_stylesheet_directory_uri(); ?>/styles/fonts.css"/>
    <link rel="stylesheet" href="<?= get_stylesheet_directory_uri(); ?>/style.css"/>
    <link rel="stylesheet" href="<?= get_stylesheet_directory_uri(); ?>/styles/map.css"/>
    <link rel="stylesheet" href="<?= get_stylesheet_directory_uri(); ?>/styles/data.css"/>
    <link rel="stylesheet" href="<?= get_stylesheet_directory_uri(); ?>/styles/modal.css"/>
    
          
    <script src="<?= get_template_directory_uri(); ?>/script.js" type="module" defer></script>
    
    <title><?= bloginfo('description'); ?></title>
</head>
<body>
    <section id="map-section">
        <header class="major-mono">
            <div>
                <h2>projeto de extensão</h2>
                <h1>cuidadores das Águas</h1>
            </div>
        </header>
        <nav class="montserrat">
            <a href="https://uftm.edu.br/campusiturama" target="_blank">
                ICAEBI - UFTM Iturama
            </a>
            <a class="modal-about-open">
                Saiba Mais
            </a>
        </nav>
        <fieldset id="panning-menu">
            <button class="montserrat" id="btn-pan-to-iturama">Iturama</button>
            <button class="montserrat" id="btn-pan-to-alexandrita">Alexandrita</button>
        </fieldset>

        <div id="map"></div>


        <footer class="montserrat">
            <a href="https://uftm.edu.br/campusiturama" target="_blank">
                ICAEBI - UFTM Campus Iturama
            </a>
            <a class="modal-about-open">
                Saiba Mais
            </a>
            <a href="https://github.com/thiagowaib/gda-dashboard" target="_blank">
                <i class="devicon-github-original" alt="@"></i>
                thiagowaib
            </a>
        </footer>
    </section>

    <section id="data-section" class="montserrat">
        <span id="data-section-cta">
            Clique em um ponto de coleta para ver os dados de análise
        </span>
        

        <button id="btn-close-data-section">x</button>
        <h1 id="data-point-description"></h1>
        <div id="data-mutable-container">
            <h2 id="data-date-description"></h2>
            <div class="data-table-container">
                <a id="data-previous">&#10094;</a>
                <div id="data-table-anchor"></div>
                <a id="data-next">&#10095;</a>
            </div>
            <div id="data-dot-container"></div>
        </div>
    </section>

    <section id="modal-about">
        <div id="modal-about-background" class="montserrat">
            <button id="modal-about-close">X</button>
            <div class="flex-container">
                <h1 class="major-mono">sobre o projeto</h1>
                <div>
                    <p>
                        O Cuidadores das Águas é um projeto de extensão da UFTM – Campus Iturama, 
                        que busca promover educação ambiental e conscientização sobre a 
                        preservação dos recursos hídricos. 
                    </p>
                    <p>
                        A iniciativa envolve atividades de 
                        monitoramento da qualidade da água, produção de materiais educativos 
                        e ações junto à comunidade, incentivando a participação cidadã no 
                        cuidado com o meio ambiente.
                    </p>
                </div>
                <span><b>Professor Responsável:</b> Armando Castello Branco Júnior</span>
            </div>
        </div>
        <div id="modal-about-backdrop"></div>
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