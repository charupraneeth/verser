<template>
  <div>
    <!-- <pre>{{ user }}</pre>
    <pre>{{ isLoggedIn }}</pre> -->
    <div class="card">
      <!-- <div class="card-image">
        <figure class="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </figure>
      </div> -->
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="user.photo" :alt="`${user.name}'s image`" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ user.name }}</p>
            <p class="subtitle is-6">{{ user.email }}</p>
            <p class="subtitle is-6">{{ user.phone }}</p>
          </div>
        </div>

        <div class="content">
          <br />
          <time><b>Created at : </b>{{ user.created_at }}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState("auth", ["user", "isLoggedIn"]),
};
</script>
