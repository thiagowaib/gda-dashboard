<?php
class FileSystem {
    public static function getUpload() {
        $uploadPath = null;
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
                $uploadPath = get_attached_file($attachment->ID);
                if(strpos(strtoupper($uploadPath), "CSV") !== FALSE) {
                    break;
                } else {
                    $uploadPath = null;
                    continue;
                }
            }
        }
        return $uploadPath;
    }
}
class Util {
    public static function test() {
        return 'Hello World';
    }
}

class Medida {
    private $ponto;
    private $latitude;
    private $longitude;
    private $data;
    private $odor;
    private $oleosGraxas;
    private $materiaisFlutuantes;
    private $residuosSolidos;
    private $turbidez;
    private $ph;
    private $oxigenio;
    private $amonia;
    private $nitrito;
    private $nitrato;
    private $fosfato;
    private $coliformes;
    private $eColi;

    public function __construct(
        $ponto,
        $latitude,
        $longitude,
        $data,
        $odor,
        $oleosGraxas,
        $materiaisFlutuantes,
        $residuosSolidos,
        $turbidez,
        $ph,
        $oxigenio,
        $amonia,
        $nitrito,
        $nitrato,
        $fosfato,
        $coliformes,
        $eColi
    ) {
        $this->ponto = $ponto;
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->data = $data;
        $this->odor = $odor;
        $this->oleosGraxas = $oleosGraxas;
        $this->materiaisFlutuantes = $materiaisFlutuantes;
        $this->residuosSolidos = $residuosSolidos;
        $this->turbidez = $turbidez;
        $this->ph = $ph;
        $this->oxigenio = $oxigenio;
        $this->amonia = $amonia;
        $this->nitrito = $nitrito;
        $this->nitrato = $nitrato;
        $this->fosfato = $fosfato;
        $this->coliformes = $coliformes;
        $this->eColi = $eColi;
    }

    public static function newFromArray($array) {
        $ponto = $array[0];

        $latitude = number_format(
            doubleval(
                str_replace(',', '.', $array[1])
            ), 4
        );
        
        $longitude = number_format(
            doubleval(
                str_replace(',', '.',$array[2])
            ), 4
        );

        $data = $array[3];
        $odor = $array[4];
        $oleosGraxas = $array[5];
        $materiaisFlutuantes = $array[6];

        $residuosSolidos = $array[7];
        $turbidez = $array[8];
        $ph = number_format(
            doubleval(
                str_replace(',', '.',$array[9])
            ), 2
        );
        $oxigenio = number_format(
            doubleval(
                str_replace(',', '.',$array[10])
            ), 2
        );
        $amonia = number_format(
            doubleval(
                str_replace(',', '.',$array[11])
            ), 2
        );
        $nitrito = number_format(
            doubleval(
                str_replace(',', '.',$array[12])
            ), 2
        );
        $nitrato = number_format(
            doubleval(
                str_replace(',', '.',$array[13])
            ), 2
        );
        $fosfato = number_format(
            doubleval(
                str_replace(',', '.',$array[14])
            ), 2
        );
        $coliformes = number_format(
            doubleval(
                str_replace(',', '.',$array[15])
            ), 0, '.', ''
        );
        $eColi = number_format(
            doubleval(
                str_replace(',', '.',$array[16])
            ), 0, '.', ''
        );
        
        return new Medida(
            $ponto,
            $latitude,
            $longitude,
            $data,
            $odor,
            $oleosGraxas,
            $materiaisFlutuantes,
            $residuosSolidos,
            $turbidez,
            $ph,
            $oxigenio,
            $amonia,
            $nitrito,
            $nitrato,
            $fosfato,
            $coliformes,
            $eColi
        );
    }

    private function hasRequiredData() {
        return isset($this->ponto) && !empty($this->ponto)
        && isset($this->latitude) && !empty($this->latitude)
        && isset($this->longitude) && !empty($this->longitude)
        && isset($this->data) && !empty($this->data);
    }

    public function toHTMLDocument() {
        if($this->hasRequiredData()) {
            return '<div 
                class="medida-item"
                style="display:none;"
                ponto="'.$this->ponto.'"
                latitude="'.$this->latitude.'"
                longitude="'.$this->longitude.'"
                data="'.$this->data.'"
                odor="'.$this->odor.'"
                oleosGraxas="'.$this->oleosGraxas.'"
                materiaisFlutuantes="'.$this->materiaisFlutuantes.'"
                residuosSolidos="'.$this->residuosSolidos.'"
                turbidez="'.$this->turbidez.'"
                ph="'.$this->ph.'"
                oxigenio="'.$this->oxigenio.'"
                amonia="'.$this->amonia.'"
                nitrito="'.$this->nitrito.'"
                nitrato="'.$this->nitrato.'"
                fosfato="'.$this->fosfato.'"
                coliformes="'.$this->coliformes.'"
                eColi="'.$this->eColi.'"
            ></div>';
        } else {
            return '';
        }
    }



}