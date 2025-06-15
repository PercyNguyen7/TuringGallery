<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!--[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />

<!--   <a href="https://github.com/PercyNguyen7/COMP348/Assignments/A1">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

# About the Turing Gallery

## 1. Gameplay
Discover the [Turing Gallery](https://turinggallery.netlify.app/) deployed!  
This React web app tasks its users to classify an infinite series of artworks into either Human or AI generated categories. 
The artwork's author and all relevant information will be revealed under the results section. 

## 2. Purpose
The Turing Gallery arms its players with a critical mind and a skeptical eye against artificially generated content.
Amidst the era of (mis)information, the inability to distinguish the real from the artificial may pervert one's truth and reality.

<!-- USAGE EXAMPLES -->
## 3. Development Process

### 1. Tools
  - **Design:** originally designed and assembled in Figma, with icons chosen from the [Iconify Figma plugin](https://iconify.design/). 
  - **Development:** Built with React.JS, Node.JS, Javascript and styled with TailwindCSS  
  - **Artworks:** Pulled from Reddit API  
  - **Loading Gifs credit:**  

### 2. Obstacles
#### 1. 1000 Listings Limitation of Reddit API
- **Challenge:**   
   The API call eventually reach the 1000 listings limit and return no data.   

-  **Solution:**   
   To make this gallery seemingly infinite, the Turing Gallery will restart the fetch request from the beginning (without using any `after` query). This approach however may result in rendering previously viewed artworks.  

#### 2. Data Variance & Treatment
-  **Challenge:**  
   Data Variance - There are two layers of variance for each Reddit post:

    - **Subreddit Variance**  
   Each subreddit tends to have its own posting traits. This makes navigating between subreddits time-consuming and demanding careful handling.

    - **Individual Post Variance**  
   Within any subreddit, each post is unique and possesses different attributes, requiring flexible handling.

-  **Solution:**  
   Dynamic Post Classification & Rendering - To address the variance in data, posts are dynamically classified as either images, videos or video embeds.

   - **Images** 🖼️  
     Most image posts from Reddit contain the `post_hint` attribute with a value of `"image"`.
     When this is detected, the Gallery renders the **Image** component.

   -  **Videos** 🎥 
      Videos are more complex, often falling into subcategories. Two useful classifications are:
      - **Reddit-Hosted Videos:**  
        - Hosting these videos is a trivial task. I use a `video` tag, with the src attribute as the `fallback_url` from the original data and voilà.   
        - However, reddit's hosted video do not contain any audios so I had to retrieve the post URL (i.e `https://v.redd.it/690bjsriel6f1`) and add `DASH_AUDIO_128.mp4` to get the audio source. A hidden `audio` tag with this source will do            the trick and we synergize it to play when:  
          - The video is played   
          - The video is paused   
          - When user changes the video playback rate (i.e 1.25 speed)   

      - **Non-Reddit-Hosted Videos**    
        - As the majority of video embeds are from YouTube, I create a Youtube component containing the iframe linked to the embed link.
        - To find the embed link, you need the video ID. Finding each video's ID is difficult as the fetched data only contains the url to its YouTube video. For instance, this video url `https://www.youtube.com/watch?v=rt_O5FJcK10` has `rt_05FJcK10` as its ID. We must extract whatever comes after the `=` sign.
        - Unfortunately, the fetched YouTube URL vary from domains to shorts/videos. Example of YouTube urls are `https://www.youtube.com/watch?v=rt_O5FJcK10`, `https://www.youtube.com/shorts/PwSOZli5_xg`, or `https://youtu.be/4nrl1PNYkYQ`,             each one requiring a different approach to find its URL.

###  3. Known Bugs
1. The  `after` queries are currently stored only for AI and Human, not specific to the subreddit. This means fetching from a new subreddit (when changing from image to video) would result in the wrong `after` tag being used. Hence I must store 4 different `afters` queries, one for each subreddit.
2. There will be repeating images due to the `after` bug above, as well as the app refetches the same data after reaching the 1000 listing limit from Reddit API. 

### 4. Future Features
The next step to this beautiful Gallery will include a login system for users to store their highscore as well as their gameplay history.  


<!-- GETTING STARTED -->
## 4. Getting Started
To get a local copy up and running follow these simple example steps.

### Prerequisites
This project requires you to install Node.JS.

### Installation
You may test out the code by either
1. Download the repo's directory via https://download-directory.github.io/ 
2. Clone the repo with
   ```sh
   git clone https://github.com/PercyNguyen7/TuringGallery
   ```

### Running Project
To start the project, use the command
`npx vite`





<!-- CONTRIBUTING -->
<!--## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!--### Top contributors:

<a href="https://github.com/PercyNguyen7/COMP348/Assignments/A1/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=PercyNguyen7/COMP348/Assignments/A1" alt="contrib.rocks image" />
</a> -->


<!-- CONTACT -->
## Contact

Percy Nguyen: [www.percynguyen.com](https://www.percynguyen.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!--[contributors-shield]: https://img.shields.io/github/contributors/PercyNguyen7/COMP348/Assignments/A1.svg?style=for-the-badge
[contributors-url]: https://github.com/PercyNguyen7/COMP348/Assignments/A1/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/PercyNguyen7/COMP348/Assignments/A1.svg?style=for-the-badge
[forks-url]: https://github.com/PercyNguyen7/COMP348/Assignments/A1/network/members
[stars-shield]: https://img.shields.io/github/stars/PercyNguyen7/COMP348/Assignments/A1.svg?style=for-the-badge
[stars-url]: https://github.com/PercyNguyen7/COMP348/Assignments/A1/stargazers
[issues-shield]: https://img.shields.io/github/issues/PercyNguyen7/COMP348/Assignments/A1.svg?style=for-the-badge
[issues-url]: https://github.com/PercyNguyen7/COMP348/Assignments/A1/issues
[license-shield]: https://img.shields.io/github/license/PercyNguyen7/COMP348/Assignments/A1.svg?style=for-the-badge
[license-url]: https://github.com/PercyNguyen7/COMP348/Assignments/A1/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/PercyNguyen
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com -->
