module.exports = function birthdayEmailTemplate({ name }) {
   return `<!DOCTYPE html>
   <html lang="en">
   
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <link rel="preconnect" href="https://fonts.googleapis.com">
       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
       <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&display=swap" rel="stylesheet">
       <title>email template</title>
       <style>
           * {
               margin: 0;
               padding: 0;
               box-sizing: border-box;
               font-family: Nunito;
           }
   
           .flowers {
               position: absolute;
               top: -1rem;
               left: -1rem;
               width: 20%;
           }
   
           .flowers_bottom {
               position: absolute;
               bottom: -1rem;
               right: -1rem;
               width: 20%;
               transform: rotateZ(180deg);
           }
   
           .email_container {
               max-width: 100%;
               min-height: 100vh;
               display: flex;
               align-items: center;
               justify-content: center;
               text-align: center;
               flex-direction: column;
               overflow: hidden;
           }
   
           .logo {
               display: block;
               margin: 2rem auto;
               width: 10rem;
           }
   
           .text_container {
               overflow: hidden;
               width: 100%;
           }
   
           .text_container>h1 {
               font-size: 1.8rem;
               font-weight: bold;
               text-transform: uppercase;
           }
   
           .text_container>h1 span {
               color: #70a73c;
           }
   
           p.intro_text {
               margin: 1.2rem 0;
               font-size: 1.1rem;
               font-weight: 600;
               color: rgb(46, 46, 46);
           }
   
           p.intro_text span {
               color: #70a73c;
           }
   
           p.surprise_text {
               margin-top: 1.5rem;
               font-size: 1.25rem;
               font-weight: bold;
           }
   
           h1.secret_text {
               margin: 2rem 0;
               color: rgb(190, 0, 0);
               font-size: 1.85rem;
               font-weight: bold;
           }
   
           p.link_desc {
               font-weight: 600;
           }
   
           p.details_desc {
               font-weight: bold;
               margin: 2rem 0;
               font-size: 1.35rem;
           }
   
           a {
               color: rgb(209, 0, 0);
               font-weight: 800;
               z-index: 10;
           }
   
           @media only screen and (max-width:500px) {
               .email_container {
                   padding: 0 0.65rem;
                   overflow: hidden;
               }
   
               .flowers {
                   width: 30%;
                   top: 1rem;
                   left: 1rem;
               }
   
               .flowers_bottom {
                   bottom: 1rem;
                   right: 1rem;
                   width: 30%;
               }
   
               p.intro_text {
                   font-size: 0.9rem;
                   color: #454545;
                   padding: 0 0.6rem;
               }
   
               p.surprise_text {
                   font-size: 1.1rem;
                   padding: 0 0.6rem;
                   font-weight: 400;
               }
   
               p.details_desc {
                   font-size: 1rem;
                   padding: 0 0.6rem;
               }
           }
       </style>
   </head>
   
   <body>
   
       <div class="email_container">
   
           <img class="flowers"
               src="https://res.cloudinary.com/react-ecom/image/upload/v1644070808/utilities/pngwing.com_klyvjt.png"
               alt="">
   
           <img class="logo" src="https://res.cloudinary.com/react-ecom/image/upload/v1644040159/utilities/logo.png"
               alt="lazy turtle">
   
           <div class="text_container">
               <h1>HAPPY BIRTHDAY <span>${name}!</span></h1>
   
               <p class="intro_text">
                   It has been such a memorable journey with you and <span>Lazy Turtle</span> wants to thank you in a
                   special way!
               </p>
   
               <p class="surprise_text">
                   We've planned a small surprise for you on your birthday and ...
               </p>
   
               <h1 class="secret_text">
                   It's a Secret!
               </h1>
   
               <p class="link_desc">
                   As per our tradition, we deliver birthday presents to our prestigious customer straight to their homes
                   <br>
                   And we don't want to leave you behind!
               </p>
   
               <p class="details_desc">
                   Given below is a link. Please fill in your delivery details for us to have a small share in your
                   happiness!
               </p>
   
               <a href="https://www.lazyturtle.in">LazyTurtle.in - Birthday Special</a>
           </div>
   
           <img class="flowers_bottom"
               src="https://res.cloudinary.com/react-ecom/image/upload/v1644070808/utilities/pngwing.com_klyvjt.png"
               alt="">
       </div>

   </body>
   
   </html>`
}