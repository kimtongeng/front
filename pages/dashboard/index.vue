<template>
<div class="flex ">
  <h1 class="text-3xl ">welcome back to library dashboard</h1>
</div>


  
  
</template>

<script>

export default {
  data() {
    return {
      userCount: 0,
      salesCount: 0,
      revenue: 0
    };
  },
  created() {
    this.fetchDashboardData();
  },
  methods: {
    fetchDashboardData() {
      // Fetch data from an API or service
      // This is just a placeholder for demonstration
      this.userCount = 100;
      this.salesCount = 50;
      this.revenue = 10000;
    }
  }
};
</script>

<style scoped>
.sidebar {
            min-height: 100vh;
            background-color: #343a40;
            color: white;
        }
        .sidebar a {
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            display: block;
        }
        .sidebar a:hover {
            background-color: #495057;
        }
        .content {
            padding: 20px;
        }
</style>