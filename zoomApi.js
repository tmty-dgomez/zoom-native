// zoomApi.js
import axios from 'axios';
import { Buffer } from 'buffer';

const ZOOM_CLIENT_ID = 'kocg7BmUJPsoFb1T1d5DbyHKw1fZtWlJ';
const ZOOM_CLIENT_SECRET = 'OJz5iK-uRnyk0F2L4tKWJg';

const getZoomToken = async () => {
  const response = await axios.post('https://api.zoom.us/v2/', null, {
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      Authorization: `Basic ${Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64')}`,
    },
  });
  return response.data.access_token;
};

export const joinZoomMeeting = async (meetingId, password) => {

    const apiUrl = `https://stgtradingapi.inpwr-tecnomty.com/api/videos/generate-signature/0/${meetingId}`;

    try {
      const signatureIdResponse = await axios.post(apiUrl);
      const signature = signatureIdResponse.data.signature;
      //console.log('Signature:', signature);
      return signature;
    } catch (error) {
      console.error('Error al obtener la firma:', error);
      throw error; 
    }
    
  const signatureId = signatureIdResponse.data.signatureId
  const response = await axios.get(`https://stgtradingapi.inpwr-tecnomty.com/api/${meetingId}`, {
    params: {
      password: password
    }
  });

  return response.data;
};

function startMeeting(signature) {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      success: (success) => {
        ////console.log(success)
        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          
          success: (success) => {
             // //console.log(success)
              const participantsButton = document.querySelector('.footer-button-base_button.ax-outline.footer-button_button');
              if (participantsButton) {
              participantsButton.style.display = 'none';
              }
              const zendDesk = document.querySelector('[title="Botón para iniciar la ventana de mensajería"]');
              zendDesk.style.visibility='hidden';
  
              const toTop = document.querySelector('.toTop');
              toTop.style.visibility='hidden';
  
              const avatarNameDiv = document.querySelector('.video-avatar__avatar-name');
  
              if (avatarNameDiv) {
              avatarNameDiv.style.fontSize = '40px';
              avatarNameDiv.style.height = '15vh';
              avatarNameDiv.style.padding='5%';
              }
              const pageFooter = document.querySelector('.meeting-info-container');
              if (pageFooter) {
                pageFooter.style.visibility='hidden';
                }
                const pageFooterZoom = document.querySelector('.page-footer');
                console.log('opculata footer zoom');
  
                if (pageFooterZoom) {
                  pageFooterZoom.style.visibility='hidden';
                  }
                  hidePageFooter();
          },
          error: (error) => {
           // //console.log(error)
          },
        })
      },
      error: (error) => {
        //console.log(error)
      }
    })
  // Muestra un alert después de 3 segundos
  setTimeout(function() {
      const pageFooterDiv = document.querySelector('.page-footer') ;
      pageFooterDiv.style.visibility = 'hidden'; // Cambiar la visibilidad a visible
      const previewAgreement = document.querySelector('.preview-agreement');
      // Verificar si el elemento existe
      if (previewAgreement) {
        // Ocultar el div cambiando su estilo de visibilidad a 'hidden'
        previewAgreement.style.visibility = 'hidden';
      }
  
    }, 3000); // 3000 milisegundos = 3 segundos
  
    setTimeout(function() {
     ocultarLoaderDs();
    }, 3500); // 3000 milisegundos = 3 segundos
    }