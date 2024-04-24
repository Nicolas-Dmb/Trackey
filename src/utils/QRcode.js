import { jsPDF } from "jspdf";
import QRCode from 'qrcode';

//print QRcode
function urlToBase64(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            const reader = new FileReader();
            reader.onloadend = function() {
                resolve(reader.result);
            }
            reader.onerror = function(error) {
                reject(error);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.onerror = function(error) {
            reject(error);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
}
const downloadCommonQRCode = async (copropriete, key) => {
    try {
        // Créez un nouvel objet jsPDF
        const doc = new jsPDF();
        // Générez le QR Code en tant qu'image PNG
        const qrDataURL = await QRCode.toDataURL(key.qr_code, { type: 'image/png', width: 105, height: 105 });
        // Ajoutez le QR Code à votre document PDF
        const imgData = await urlToBase64(qrDataURL); // Convertir l'URL en données d'image base64
        doc.addImage(imgData, 'PNG', 10, 10, 30, 30);
        doc.setTextColor(55,64,28)
        doc.text(`Copro ${copropriete.Numero}`, 37, 17);
        // Ajoutez le texte à côté du QR Code
        let y = 22;
        let text = key.acces;
        const maxLengthPerRow = 9; // Nombre maximal de caractères par ligne
        const length = text.length;
        const rows = Math.ceil(length / maxLengthPerRow); // Nombre total de lignes nécessaires
        doc.setTextColor(92,124,47)
        for (let i = 0; i < rows; i++) {
        // Détermine les indices de début et de fin pour cette ligne
        const startIndex = i * maxLengthPerRow;
        const endIndex = Math.min((i + 1) * maxLengthPerRow, length); // Limite supérieure

        // Obtient la sous-chaîne pour cette ligne
        const rowText = text.substring(startIndex, endIndex);

        // Affiche la sous-chaîne sur la ligne actuelle
        doc.text(rowText, 37, y);

        // Incrémente la position verticale pour la prochaine ligne
        y += 5; // Ajustez cette valeur selon l'espacement souhaité entre les lignes
        }
        // Sauvegardez le document PDF
        doc.save("qrcode.pdf");
    } catch (err) {
        alert('Erreur de génération QR Code', err);
    }
};

const downloadPrivateQRCode = async (copropriete, key) => {
    try {
        // Créez un nouvel objet jsPDF
        const doc = new jsPDF();
        // Générez le QR Code en tant qu'image PNG
        const qrDataURL = await QRCode.toDataURL(key.qr_code, { type: 'image/png', width: 105, height: 105 });
        // Ajoutez le QR Code à votre document PDF
        const imgData = await urlToBase64(qrDataURL); // Convertir l'URL en données d'image base64
        doc.addImage(imgData, 'PNG', 10, 10, 30, 30);
        doc.setTextColor(0,0,0)
        doc.text(`Copro ${copropriete.Numero}`, 37, 17);
        let proprio = key.name
        let row = 1
        doc.setTextColor(55,64,28)
        if (proprio.length > 9){
            row = 3
            const proprio2 = proprio.substring(10, proprio.length)
            proprio = proprio.substring(0,9)
            doc.text(`${proprio}`, 37, 22);
            doc.text(`${proprio2}`, 37, 27);
        }else{
            row = 2
            doc.text(`${proprio}`, 37, 22);
        }
        // Ajoutez le texte à côté du QR Code
        let y = 27
        if (row === 3){
            y = 32
        }
        let text = key.acces;
        const maxLengthPerRow = 9; // Nombre maximal de caractères par ligne
        const length = text.length;
        doc.setTextColor(92,124,47)
        for (let i = 0; row < 5 ; i++) {
        // Détermine les indices de début et de fin pour cette ligne
        const startIndex = i * maxLengthPerRow;
        const endIndex = Math.min((i + 1) * maxLengthPerRow, length); // Limite supérieure

        // Obtient la sous-chaîne pour cette ligne
        const rowText = text.substring(startIndex, endIndex);

        // Affiche la sous-chaîne sur la ligne actuelle
        doc.text(rowText, 37, y);

        // Incrémente la position verticale pour la prochaine ligne
        row +=1
        y += 5; // Ajustez cette valeur selon l'espacement souhaité entre les lignes
        }
        // Sauvegardez le document PDF
        doc.save("qrcode.pdf");
    } catch (err) {
        alert('Erreur de génération QR Code', err);
    }
};

const downloadQRCode = async (copropriete, commonkeys, privatekeys) => {
    try {
        const doc = new jsPDF();
        //titre du doc au milieu
        doc.setTextColor(0,0,0)
        doc.text(`Copropriété ${copropriete.Numero}`, 75, 5);
        //QR code clé commune : 
        let n = 19
        const yPos = 10; // Position verticale initiale
        let currentYPos = yPos;
        let currentXPos = 10; // Position horizontale initiale
        let column = 1
        for (let i = 0; i < commonkeys.length; i++){
            const key = commonkeys[i]
            if (column === 4){
                column = 1
                currentXPos = 10
                currentYPos += (40)
            }
            //nom de la clé : au dessus-etiquette:
            doc.setTextColor(0,0,0)
            doc.text(`clé n° ${key.name}`, currentXPos+17, currentYPos)
            // Générez le QR Code en tant qu'image PNG
            const qrDataURL = await QRCode.toDataURL(key.qr_code, { type: 'image/png', width: 105, height: 105 });
            // Ajoutez le QR Code à votre document PDF
            const imgData = await urlToBase64(qrDataURL); // Convertir l'URL en données d'image base64
            doc.addImage(imgData, 'PNG', currentXPos, currentYPos, 30, 30);
            doc.setTextColor(55,64,28)
            doc.text(`Copro ${copropriete.Numero}`, currentXPos+27, currentYPos+7);
            // Ajoutez le texte à côté du QR Code
            let y = currentYPos+12;
            let text = key.acces;
            const maxLengthPerRow = 9; // Nombre maximal de caractères par ligne
            const length = text.length;
            const rows = Math.ceil(length / maxLengthPerRow); // Nombre total de lignes nécessaires
            doc.setTextColor(92,124,47)
            for (let i = 0; i < rows; i++) {
                // Détermine les indices de début et de fin pour cette ligne
                const startIndex = i * maxLengthPerRow;
                const endIndex = Math.min((i + 1) * maxLengthPerRow, length); // Limite supérieure

                // Obtient la sous-chaîne pour cette ligne
                const rowText = text.substring(startIndex, endIndex);

                // Affiche la sous-chaîne sur la ligne actuelle
                doc.text(rowText, currentXPos+27, y);

                // Incrémente la position verticale pour la prochaine ligne
                y += 5; // Ajustez cette valeur selon l'espacement souhaité entre les ligne
            }
            currentXPos = (currentXPos+27)+(37)
            column +=1
            if (i > n){
                doc.addPage();
                currentYPos = 10
                column = 1
                currentXPos = 10
                n = n + 19
                doc.setTextColor(0,0,0)
                doc.text(`suite clés communes`, 75, 5);
            }

        }
        doc.addPage();
        currentYPos = 10
        column = 1
        currentXPos = 10
        n = 19
        doc.setTextColor(0,0,0)
        doc.text(`clés privatives`, 75, 5);
        //Clé privative
        for (let c = 0; c < privatekeys.length; c++){
            const key = privatekeys[c]
            if (column === 4){
                column = 1
                currentXPos = 10
                currentYPos += (40)
            }
            //Générer Qrcode
            const qrDataURL = await QRCode.toDataURL(key.qr_code, { type: 'image/png', width: 105, height: 105 });
            // Ajoutez le QR Code à votre document PDF
            const imgData = await urlToBase64(qrDataURL); // Convertir l'URL en données d'image base64
            doc.addImage(imgData, 'PNG', currentXPos, currentYPos, 30, 30);
            doc.setTextColor(0,0,0)
            doc.text(`Copro ${copropriete.Numero}`, currentXPos+27, currentYPos+7);
            let proprio = key.name
            let row = 1
            doc.setTextColor(55,64,28)
            if (proprio.length > 9){
                row = 3
                const proprio2 = proprio.substring(10, proprio.length)
                proprio = proprio.substring(0,9)
                doc.text(`${proprio}`,currentXPos+27, currentYPos+12);
                doc.text(`${proprio2}`,currentXPos+27, currentYPos+17);
            }else{
                row = 2
                doc.text(`${proprio}`, currentXPos+27, currentYPos+12);
            }
            // Ajoutez le texte à côté du QR Code
            let y = currentYPos+17
            if (row === 3){
                y = currentYPos+22
            }
            let text = key.acces;
            const maxLengthPerRow = 9; // Nombre maximal de caractères par ligne
            const length = text.length;
            doc.setTextColor(92,124,47)
            for (let r = 0; row < 5 ; r++) {
                // Détermine les indices de début et de fin pour cette ligne
                const startIndex = r * maxLengthPerRow;
                const endIndex = Math.min((r + 1) * maxLengthPerRow, length); // Limite supérieure

                // Obtient la sous-chaîne pour cette ligne
                const rowText = text.substring(startIndex, endIndex);

                // Affiche la sous-chaîne sur la ligne actuelle
                doc.text(rowText, currentXPos+27, y);

                // Incrémente la position verticale pour la prochaine ligne
                row +=1
                y += 5; // Ajustez cette valeur selon l'espacement souhaité entre les lignes
                }
            if (c > n){
                doc.addPage();
                currentYPos = 10
                column = 1
                currentXPos = 10
                n = n+19
                doc.text(`Suite clés privatives`, 75, 5);
            }else{
                currentXPos = (currentXPos+27)+(37)
                column +=1
            }
        }
        doc.save("qrcode.pdf");
    } catch (err) {
        alert('Erreur de génération de la page', err);
    }
};
export {downloadCommonQRCode, downloadPrivateQRCode, downloadQRCode};