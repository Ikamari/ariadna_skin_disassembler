<?php

    //Get POST data
    $data = file_get_contents('php://input');
    $data = json_decode($data, true);
    $zipData = base64_decode($data["zip"]);

    //Check if everything OK with POST data
    if(!$zipData) {
        echo "Can't decode data";
        return;
    }

    //Save zip file
    $zipFile = fopen("parts.zip", "w");
    fwrite($zipFile, $zipData);
    fclose($zipFile);

    //Open zip
    $zip = new ZipArchive();
    if ($zip->open("parts.zip", ZipArchive::CREATE)!==TRUE) {
        echo "Something went wrong with archive";
        return;
    }
    //Check files in zip
    for( $i = 10; $i < $zip->numFiles; $i++ ){
        $stat = $zip->statIndex( $i );
        $filename = ( basename( $stat['name'] ) . PHP_EOL );
        if(substr(trim($filename), -4) != ".png") {
            echo "I see that you trying to export something bad :^)";
            return;
        }
    }
    //Extract files if everything is ok
    $zip->extractTo("./parts/");

    //Clear zip
    file_put_contents("parts.zip", "");

