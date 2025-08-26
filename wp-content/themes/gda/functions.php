<?php

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

    public function __construct(
        $ponto,
        $latitude,
        $longitude,
        $data,
        $odor,
        $oleosGraxas,
        $materiaisFlutuantes
    ) {
        $this->ponto = $ponto;
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->data = $data;
        $this->odor = $odor;
        $this->oleosGraxas = $oleosGraxas;
        $this->materiaisFlutuantes = $materiaisFlutuantes;
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
        
        return new Medida(
            $ponto,
            $latitude,
            $longitude,
            $data,
            $odor,
            $oleosGraxas,
            $materiaisFlutuantes
        );
    }

    public function toHTMLDocument() {
        return '<div 
            class="medida-item"
            ponto="'.$this->ponto.'"
            latitude="'.$this->latitude.'"
            longitude="'.$this->longitude.'"
            data="'.$this->data.'"
            odor="'.$this->odor.'"
            oleosGraxas="'.$this->oleosGraxas.'"
            materiaisFlutuantes="'.$this->materiaisFlutuantes.'"
        ></div>
        ';
    }



}