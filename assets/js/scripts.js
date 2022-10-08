const { gsap } = require("gsap/dist/gsap");
const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");

gsap.registerPlugin(ScrollTrigger);

let scroll;

console.log(document);

const body = document.body;
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

initPageTransitions();

function initPageTransitions() {

    //let scroll;

    // do something before the transition starts
    barba.hooks.before(() => {
        select('html').classList.add('is-transitioning');
    });

    // do something after the transition finishes
    barba.hooks.after(() => {
        select('html').classList.remove('is-transitioning');
        // reinit locomotive scroll
        scroll.init();
        scroll.stop();
    });

    // scroll to the top of the page
    barba.hooks.enter(() => {
        scroll.destroy();
    });

    // scroll to the top of the page
    barba.hooks.afterEnter(() => {
        window.scrollTo(0, 0);
        initCookieViews();
    });

    barba.init({
        sync: true,
        debug: false,
        timeout: 7000,
        transitions: [{
            name: 'default',
            once(data) {
                // do something once on the initial page load
                initSmoothScroll(data.next.container);
                initScript();
                initCookieViews();
                initLoader();
            },
            async leave(data) {
                // animate loading screen in
                pageTransitionIn(data.current);
                await delay(495);
                data.current.container.remove();
            },
            async enter(data) {
                // animate loading screen away
                pageTransitionOut(data.next);
                initNextWord(data);
            },
            async beforeEnter(data) {
                ScrollTrigger.getAll().forEach(t => t.kill());
                scroll.destroy();
                initSmoothScroll(data.next.container);
                initScript();
            },
        },
        {
            name: 'to-home',
            from: {
            },
            to: {
                namespace: ['home']
            },
            once(data) {
                // do something once on the initial page load
                initSmoothScroll(data.next.container);
                initScript();
                initCookieViews();
                initLoaderHome();
            },
        }]
    });

    function initSmoothScroll(container) {

        scroll = new LocomotiveScroll({
            el: container.querySelector('[data-scroll-container]'),
            smooth: true,
        });

        window.onresize = scroll.update();

        scroll.on("scroll", () => ScrollTrigger.update());

        ScrollTrigger.scrollerProxy('[data-scroll-container]', {
            scrollTop(value) {
                return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
            pinType: container.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
        });

        ScrollTrigger.defaults({
            scroller: document.querySelector('[data-scroll-container]'),
        });

        /**
         * Remove Old Locomotive Scrollbar
         */

        const scrollbar = selectAll('.c-scrollbar');

        if (scrollbar.length > 1) {
            scrollbar[0].remove();
        }

        // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
        ScrollTrigger.addEventListener('refresh', () => scroll.update());

        // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
        ScrollTrigger.refresh();
    }
}

/**
 * Fire all scripts on page load
 */
function initScript() {
    initScrollLetters();
    initTricksWords();
    initTimeZone();
    initScrolltriggerAnimations();
}

/**
* Scrolltrigger Scroll Letters Home
*/
function initScrollLetters() {
    // Scrolling Letters Both Direction
    // https://codepen.io/GreenSock/pen/rNjvgjo
    // Fixed example with resizing
    // https://codepen.io/GreenSock/pen/QWqoKBv?editors=0010

    let direction = 1; // 1 = forward, -1 = backward scroll

    const roll1 = roll(".marquee-text", { duration: 18 }),
        scroll = ScrollTrigger.create({
            trigger: document.querySelector('[data-scroll-container]'),
            onUpdate(self) {
                if (self.direction !== direction) {
                    direction *= -1;
                    gsap.to([roll1], { timeScale: direction, overwrite: true });
                }
            }
        });

    // helper function that clones the targets, places them next to the original, then animates the xPercent in a loop to make it appear to roll across the screen in a seamless loop.
    function roll(targets, vars, reverse) {
        vars = vars || {};
        vars.ease || (vars.ease = "none");
        const tl = gsap.timeline({
            repeat: -1,
            onReverseComplete() {
                this.totalTime(this.rawTime() + this.duration() * 10); // otherwise when the playhead gets back to the beginning, it'd stop. So push the playhead forward 10 iterations (it could be any number)
            }
        }),
            elements = gsap.utils.toArray(targets),
            clones = elements.map(el => {
                let clone = el.cloneNode(true);
                el.parentNode.appendChild(clone);
                return clone;
            }),
            positionClones = () => elements.forEach((el, i) => gsap.set(clones[i], { position: "absolute", overwrite: false, top: el.offsetTop, left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth) }));
        positionClones();
        elements.forEach((el, i) => tl.to([el, clones[i]], { xPercent: reverse ? 100 : -100, ...vars }, 0));
        window.addEventListener("resize", () => {
            let time = tl.totalTime(); // record the current time
            tl.totalTime(0); // rewind and clear out the timeline
            positionClones(); // reposition
            tl.totalTime(time); // jump back to the proper time
        });
        return tl;
    }

}

/**
* Scrolltrigger Nav
*/
function initTricksWords() {

    // Copyright start
    // © Code by T.RICKS, https://www.tricksdesign.com/
    // You have the license to use this code in your projects but not redistribute it to others
    // Tutorial: https://www.youtube.com/watch?v=xiAqTu4l3-g&ab_channel=TimothyRicks

    // Find all text with .tricks class and break each letter into a span
    var spanWord = document.getElementsByClassName("span-lines");
    for (var i = 0; i < spanWord.length; i++) {
        var wordWrap = spanWord.item(i);
        wordWrap.innerHTML = wordWrap.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="span-line"><span class="span-line-inner">$2</span></span>');
    }

}

function initTimeZone() {

    // Time zone
    // https://stackoverflow.com/questions/39418405/making-a-live-clock-in-javascript/67149791#67149791
    // https://stackoverflow.com/questions/8207655/get-time-of-specific-timezone
    // https://stackoverflow.com/questions/63572780/how-to-update-intl-datetimeformat-with-new-date

    const timeSpan = document.querySelector("#timeSpan");

    const optionsTime = {
        timeZone: 'Europe/Bucharest',
        timeZoneName: 'short',
        // year: 'numeric',
        // month: 'numeric',
        // day: 'numeric',
        hour: '2-digit',
        hour12: 'true',
        minute: 'numeric',
        // second: 'numeric',
    };

    const formatter = new Intl.DateTimeFormat([], optionsTime);
    updateTime();
    setInterval(updateTime, 1000);

    function updateTime() {
        const dateTime = new Date();
        const formattedDateTime = formatter.format(dateTime);
        timeSpan.textContent = formattedDateTime;
    }

}

function initScrolltriggerAnimations() {

    // Scrolltrigger Animation : Span Lines Intro Home
    if (document.querySelector(".span-lines.animate")) {
        $(".span-lines.animate").each(function (index) {
            let triggerElement = $(this);
            let targetElement = $(".span-lines.animate .span-line-inner");

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    toggleActions: 'play none none reset',
                    start: "0% 100%",
                    end: "100% 0%"
                }
            });
            if (targetElement) {
                tl.from(targetElement, {
                    y: "100%",
                    stagger: .01,
                    ease: "power3.out",
                    duration: 1,
                    delay: 0
                });
            }
        });
    }

}