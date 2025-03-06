document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".scroll-list");
  const items = Array.from(list.children);

  // Duplicate items
  items.forEach((item) => {
    let clone = item.cloneNode(true);
    list.appendChild(clone);
  });

  let scrollSpeed = 30; // Pixels per second (consistent across devices)
  let listWidth = list.scrollWidth / 2; // Get width of one full set of items
  let scrollPosition = 0;
  let lastTimestamp = null;

  function scrollLoop(timestamp) {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    // Calculate the time difference
    let deltaTime = (timestamp - lastTimestamp) / 1000; // Convert to seconds
    lastTimestamp = timestamp;

    // Move based on time elapsed
    scrollPosition += scrollSpeed * deltaTime;

    // Reset position for infinite effect
    if (scrollPosition >= listWidth) {
      scrollPosition = 0;
    }

    list.style.transform = `translateX(${-scrollPosition}px)`;

    requestAnimationFrame(scrollLoop);
  }

  requestAnimationFrame(scrollLoop);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});