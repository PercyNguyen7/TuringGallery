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

# Turing Gallery

## Gameplay
[Discover the Turing Gallery](https://turinggallery.netlify.app/)
The web application introduces their users to an infinite series of recent AI/Human artworks drawn from Reddit. Once the user finished classifying an artwork, the artwork's author and all relevant information will be revealed under the results section. 

## Purpose
The Turing Gallery arms its players with a critical mind and a skeptical eye against artificially generated content.
Amidst the era of (mis)information, the inability to distinguish the real from the artificial may pervert one's truth and reality.

<!-- USAGE EXAMPLES -->
## Development

### 1. Tools
Design: originally designed and assembled in Figma, with icons chosen from the [Iconify Figma plugin](https://iconify.design/). 
Development: Built with React.JS, Node.JS, Javascript and styled with TailwindCSS

### 2. Challenges
#### 1. 1000 Listings Limitation of Reddit API
**Challenge:** 
To avoid pulling the same information every time, I used the `after` query to fetch the next batch of artworks. However, the API call eventually reach the 1000 listings limit and return no data.   

**Solution:** 
To make this gallery seemingly infinite, the Turing Gallery will fetch restart the fetch from the beginning which does may however render previously viewed artworks.  

**Challenge:** Data Variance - There are two layers of variance for each Reddit post:

1. **Subreddit Variance**  
   Each subreddit tends to have its own posting traits. This makes navigating between subreddits time-consuming and demanding careful handling.

2. **Individual Post Variance**  
   Within any subreddit, each post is unique and possesses different attributes, requiring flexible handling.

**Solution:**  
Dynamic Post Classification & Rendering
 * To address the variance in data, posts are dynamically classified into images or videos.

   #### 🖼️ Images
   Most image posts from Reddit contain the `post_hint` attribute with a value of `"image"`.
   When this is detected, the Gallery renders the **Image** component.

   #### 🎥 Videos
   Videos are more complex, often falling into subcategories. Two useful classifications are:

- **Reddit-Hosted Videos**
   These videos do not contains audios, and while it easy easy to host them locally (via their `fallback_url` tag), I had to retrieve their audio manually, hide it, then synergize it to play whenever the user clicks on a video.
  
- **Non-Reddit-Hosted Videos**
   Due to majority of video embeds being from youtube, I create a YoutubeEmbed component which contains the embed code with the appropriate source. Even finding the youtube video's ID is difficult, as each subreddit data never contains the embed source, but rather contains a youtube link with the youtube ID. This YouTube ID is then deduced from various sources

   https://www.youtube.com/watch?v=rt_O5FJcK10, https://www.youtube.com/shorts/PwSOZli5_xg, or https://youtu.be/4nrl1PNYkYQ.


### 3. Future Development
#### In the foreseeable future, the Gallery will include a login system for users to store their point as well as their gameplay history.  


<!-- ABOUT THE PROJECT -->
<!--## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com) 

Here's a blank template to get started. To avoid retyping too much info, do a search and replace with your text editor for the following: `PercyNguyen7`, `COMP348/Assignments/A1`, , `PercyNguyen`, `project_title`, `project_description`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* [![Svelte][Svelte.dev]][Svelte-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Vue][Vue.js]][Vue-url]
* [![Angular][Angular.io]][Angular-url] -->


<!-- GETTING STARTED -->
## Getting Started
This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites
This project requires to be run on a Linux machine, or run on Ubuntu

### Installation
You may test out the code by either
1. Download the repo's directory via https://download-directory.github.io/ 
   
2. Clone the repo with
   ```sh
   git clone https://github.com/PercyNguyen7/COMP348/Assignments/A1.git
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

### Compilation
Once downloaded, compile it and run the following code in your terminal
```sh
  gcc -o kode -Wall kode.c fileread.c wreplace.c ui.c 
   ```



### Running Project
You can run the project with the following command and parameters
`./kode <command> <word> <file>`

| Parameters | Description |
| ------------- | ------------- |
| command| Either RC, RI, UK or UM |
| word | The word you want to redact/unmask in the text file |
| file | The file name |

| Command  | Description |
| ------------- | ------------- |
| RC | Redact Case Sensitive |
| RI | Redact Case Ignored |
| UK | Unmask Keep Case |
| UM | Unmask Special Case |

If you have Valgrind installed, you may also check for memory leak via the following line before running the program:
```sh
    valgrind -s --leak-check=full --show-leak-kinds=all --track-origins=yes ./kode <command> <word> <file>
```
<!-- ROADMAP -->
<!-- ## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/PercyNguyen7/COMP348/Assignments/A1/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



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

Project Link: [https://github.com/PercyNguyen7/COMP348/Assignments/A1](https://github.com/PercyNguyen7/COMP348/Assignments/A1)

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
