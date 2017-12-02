<?php

    //Get POST data
    $data = file_get_contents('php://input');
    $data = json_decode($data, true);
    $zipData = base64_decode($data["zip"]);

    //Check if everything OK with POST data
    if(!$zipData) {
        echo "Не удалось успешно загрузить данные :(";
        return;
    }

    //Save zip file
    $zipFile = fopen("parts.zip", "w");
    fwrite($zipFile, $zipData);
    fclose($zipFile);

    //Open zip
    $zip = new ZipArchive();
    if ($zip->open("parts.zip", ZipArchive::CREATE)!==TRUE) {
        echo "С данными произошло что-то нехорошее";
        return;
    }
    //Check files in zip
    for( $i = 10; $i < $zip->numFiles; $i++ ){
        $stat = $zip->statIndex( $i );
        $filename = ( basename( $stat['name'] ) . PHP_EOL );
        if(substr(trim($filename), -4) != ".png") {
            echo "Видать у тебя в архиве что-то лишнее в данных :^)";
            return;
        }
    }
    //Extract files if everything is ok
    $zip->extractTo("../skin-creator/img/");
    echo "Части успешно загружены";

    //Clear zip
    file_put_contents("parts.zip", "");

