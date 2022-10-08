<template>
  <div>
    <Subheader
      title="I’m a non <span class='ff-secondary'>award-winning</span> digital designer"
      headline="Born in<br>Bucharest, Romania"
      rightHeadline="Available for freelance work"
    />
    <WorkItems :showTitle="true" :showMore="true" :limit="1" />
    <!-- <section class="section work" data-scroll-section>
      <div class="container">
        <h5>Some of my projects</h5>
        <div class="work-items">
          <div class="work-item">
            <img src="~/assets/images/journal-of-brielle.jpg" alt="" />
          </div>
          <div class="work-group">
            <div class="work-item">
              <img src="~/assets/images/04.jpg" alt="" />
            </div>
            <div class="work-item">
              <img src="~/assets/images/ente-studio.jpg" alt="" />
            </div>
          </div>
          <div class="work-item">
            <img src="~/assets/images/emma-crawford.jpg" alt="" />
          </div>
          <div class="work-group">
            <div class="work-item">
              <img src="~/assets/images/costin-trifan.jpg" alt="" />
            </div>
            <div class="work-item">
              <img src="~/assets/images/03.jpg" alt="" />
            </div>
          </div>
        </div>
        <a href="#" class="work-all">View all work +</a>
      </div>
    </section> -->
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
