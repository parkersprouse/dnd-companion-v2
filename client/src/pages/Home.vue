<template>
  <div style='text-align: center; margin-top: 3rem; font-size: 2rem;'>
    Work In Progress
    <div>{{ user_data }}</div>
  </div>
</template>

<script>
// import Pusher from 'pusher-js';

export default {
  name: 'home',
  props: ['user'],
  data() {
    return {
      user_data: JSON.stringify(this.user),
    };
  },
  // mounted() {
  //   Pusher.logToConsole = process.env.NODE_ENV !== 'production';
  //   const pusher = new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
  //     cluster: 'us2',
  //     forceTLS: process.env.NODE_ENV === 'production'
  //   });
  //   const channel = pusher.subscribe('my-channel');
  //   channel.bind('my-event', (data) => {
  //     console.log('GOtEET')
  //     console.log(JSON.stringify(data));
  //   });
  // }
};
</script>
