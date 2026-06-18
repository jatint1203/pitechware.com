(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Fixed Navbar
  $(window).scroll(function () {
    if ($(window).width() < 992) {
      if ($(this).scrollTop() > 45) {
        $(".fixed-top").addClass("bg-white shadow");
      } else {
        $(".fixed-top").removeClass("bg-white shadow");
      }
    } else {
      if ($(this).scrollTop() > 45) {
        $(".fixed-top").addClass("bg-white shadow").css("top", -45);
      } else {
        $(".fixed-top").removeClass("bg-white shadow").css("top", 0);
      }
    }
  });

  // Smooth section navigation
  $('.navbar-nav a[href^="#"], .footer a[href^="#"], a.btn[href^="#"]').on(
    "click",
    function (event) {
      var href = $(this).attr("href");

      if (!href || href === "#") {
        return;
      }

      var target = $(href);
      if (target.length) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 76,
          },
          900,
          "easeInOutExpo"
        );
        $(".navbar-collapse").collapse("hide");
      }
    }
  );

  // Active section state
  $(window).on("scroll", function () {
    var scrollPosition = $(this).scrollTop() + 120;

    $("section[id]").each(function () {
      var currentSection = $(this);
      var sectionTop = currentSection.offset().top;
      var sectionBottom = sectionTop + currentSection.outerHeight();

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        $(".navbar-nav .nav-link").removeClass("active");
        $(
          '.navbar-nav .nav-link[href="#' + currentSection.attr("id") + '"]'
        ).addClass("active");
      }
    });
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Project carousel
  $(".project-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    loop: true,
    center: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

// File Upload Validation

const projectFile =
    document.getElementById("projectFile");

const fileError =
    document.getElementById("fileError");

if (projectFile) {

    projectFile.addEventListener("change", function () {

        fileError.style.display = "none";
        fileError.textContent = "";

        const file = this.files[0];

        if (!file) return;

        // Max Size = 5 MB
        const maxSize = 5 * 1024 * 1024;

        // Allowed Types
        const allowedTypes = [
            "application/pdf",

            "application/vnd.ms-excel",

            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ];

        // Validate Type
        if (!allowedTypes.includes(file.type)) {

            fileError.style.display = "block";

            fileError.textContent =
                "Only PDF and Excel files are allowed.";

            this.value = "";

            return;
        }

        // Validate Size
        if (file.size > maxSize) {

            fileError.style.display = "block";

            fileError.textContent =
                "File size must be under 5 MB.";

            this.value = "";

            return;
        }
    });
}


// Interactive Services

const servicesData = {

    civil: {

        title: "Civil & Building Construction",

        description:
            "Professional civil construction services for residential, commercial and infrastructure projects with quality-focused execution.",

        video:
            "./data/services/construction.mp4",

        points: [
              "Residential Building Construction",
              "Commercial Building Construction",
              "Industrial Civil Works",
              "Turnkey Civil Projects",
              "Foundation & Structural Works"
        ]
    },

    earthwork: {

        title: "Earthwork & Excavation Solutions",

        description:
            "Reliable excavation and grading services with proper site coordination and heavy equipment support.",

        video:
            "./data/services/excavator.mp4",

        points: [
            "Site excavation",
            "Trenching & Backfilling",
            "Land Development Earthwork",
            "Cutting & Filling Works",
            "Excavator / JCB Services"
        ]
    },

    road: {

        title: "Road & Infrastructure Projects",

        description:
            "Road construction and infrastructure execution solutions for industrial and public projects.",

        video:
            "./data/services/road.mp4",

        points: [
            "Internal Roads & Layout Roads",
            "Road Construction",
            "Culvert Works",
            "Infrastructure Development Projects",
            "Government & Private Contract Works"
        ]
    },

    demolition: {

        title: "Demolition & Site Development",

        description:
            "Controlled demolition and debris handling services for safe and organized site preparation.",

        video:
            "./data/services/demolition.mp4",

        points: [
            "Site Clearing",
            "Land Levelling",
            "Grading Works",
            "Demolition Services",
            "Debris Removal & Disposal"
        ]
    },

    materials: {

        title: "Construction Material Supply",

        description:
            "Consistent construction material supply with delivery coordination and site-ready logistics.",

        video:
            "./data/services/materials.mp4",

        points: [
            "River Sand Supply",
            "M-Sand Supply",
            "Filling Sand Supply",
            "10mm, 20mm & 40mm Aggregates etc.",
            "Gravel & Metal Supply",
            "Bricks Supply",
            "Fly Ash Bricks Supply",
            "Concrete Blocks Supply"
        ]
    },

    railway: {

        title: "Railway Infrastructure Services",

        description:
            "Railway civil support and track-side infrastructure work executed with proper compliance.",

        video:
            "./data/services/railway.mp4",

        points: [
            "Railway Earthwork",
            "Railway Trackside Civil Works",
            "Railway Infrastructure Support"
        ]
    },

    equipment: {

        title: "Construction Equipment Rental",

        description:
            "Heavy equipment rental solutions with operator coordination and site deployment support.",

        video:
            "./data/services/equipment.mp4",

        points: [
            "JCB Rental",
            "Excavator Rental",
            "Heavy / Tipper Rental",
            "Earthmoving Equipment Rental"
        ]
    },

    logistics: {

        title: "Logistics & Turnkey Project Solutions",

        description:
            "Efficient transportation planning and site logistics support for uninterrupted execution.",

        video:
            "./data/services/logistics.mp4",

        points: [
            "Material Transportation",
            "Construction Logistics Support",
            "Tipper Transport Services",
            "Equipment Shifting Services",
            "Government Project Execution",
            "Private Project Contracts",
            "Infrastructure Turnkey Projects",
            "End-to-end Civil Work Solutions"
        ]
    }
};

const serviceCards =
    document.querySelectorAll(".service-grid-card");

const serviceTitle =
    document.getElementById("serviceTitle");

const serviceDescription =
    document.getElementById("serviceDescription");

const servicePoints =
    document.getElementById("servicePoints");

const serviceVideo =
    document.getElementById("serviceVideo");

if (serviceCards.length) {

    serviceCards.forEach(card => {

        card.addEventListener("click", function () {

            const service =
                this.dataset.service;

            const data =
                servicesData[service];

            // Active State
            serviceCards.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            // Update Title
            serviceTitle.textContent =
                data.title;

            // Update Description
            serviceDescription.textContent =
                data.description;

            // Update Points
            servicePoints.innerHTML = "";

            data.points.forEach(point => {

                const li =
                    document.createElement("li");

                li.textContent = point;

                servicePoints.appendChild(li);
            });

            // Update Video
            serviceVideo.querySelector("source").src =
                data.video;

            serviceVideo.load();

            serviceVideo.play();
        });
    });
}

function setNavbarOffset() {
    const navbar = document.querySelector(".fixed-top");

    if (!navbar) {
        return;
    }

    const height = Math.ceil(navbar.getBoundingClientRect().height);
    document.documentElement.style.setProperty(
        "--navbar-offset",
        height + "px"
    );
}

window.addEventListener("load", function () {
    setNavbarOffset();
    setTimeout(setNavbarOffset, 150);
});

window.addEventListener("resize", setNavbarOffset);

if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setNavbarOffset);
}

const navbarCollapse = document.getElementById("navbarCollapse");

if (navbarCollapse) {
    navbarCollapse.addEventListener("shown.bs.collapse", setNavbarOffset);
    navbarCollapse.addEventListener("hidden.bs.collapse", setNavbarOffset);
}

const navbarLogo = document.querySelector(".site-logo");

if (navbarLogo) {
    navbarLogo.addEventListener("load", setNavbarOffset);
}