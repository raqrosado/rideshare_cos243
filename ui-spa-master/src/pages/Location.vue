<template>
  <v-container>
    <div>
      <h4 class="display-1">Locations</h4>

      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="Locations"
      >
        <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.name }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.city }}</td>
            <td>{{ item.state }}</td>
            <td>{{ item.zipCode }}</td>
            <td>
              <v-icon small @click="deleteLocation(item)">
                mdi-delete
              </v-icon>
              <v-icon small class="ml-2" @click="updateLocation(item)">
                mdi-pencil
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>

      <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
        <v-btn color="blue" text @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Locations",

  data: function() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Address", value: "address" },
        { text: "City", value: "city" },
        { text: "State", value: "state" },
        { text: "Zip Code", value: "zipCode" },
        { text: "Action", value: "action" }
      ],
      locations: [],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    this.$axios.get("/locations").then(response => {
      this.locations = response.data.map(location => ({
        id: location.id,
        address: location.address,
        city: location.city,
        state: location.state,
        zipCode: location.zipCode
      }));
    });
  },

  methods: {
    // Display a snackbar message.
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.show = true;
    },

    // Calculate the CSS class for an item
    itemClass(item) {
      const currentLocation = this.$store.state.currentLocation;
      if (currentLocation && currentLocation.id === item.id) {
        return "currentLocation";
      }
    },

    // Update location information.
    updateLocation(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      this.showSnackbar("Sorry, update is not yet implemented.");
    },

    // Delete an location.
    deleteLocation(item) {
      this.$axios.delete(`/locations/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local location
          // by filtering the deleted location from the list of locations.
          this.locations = this.locations.filter(
            location => location.id !== item.id
          );
        }
      });
    }
  }
};
</script>

<style>
.currentLocation {
  background: lightcoral;
}
</style>
