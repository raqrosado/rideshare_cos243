<template>
  <v-container>
    <div>
      <h4 class="display-1">Vehicle</h4>

      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="Vehicle"
      >
        <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.make }}</td>
            <td>{{ item.model }}</td>
            <td>{{ item.color }}</td>
            <td>{{ item.vehicleTypeId }}</td>
            <td>{{ item.capacity }}</td>
            <td>{{ item.mpg }}</td>
            <td>{{ item.licenseState }}</td>
            <td>{{ item.licensePlate }}</td>
            <td>
              <v-icon small @click="deleteVehicle(item)">
                mdi-delete
              </v-icon>
              <v-icon small class="ml-2" @click="updateVehicle(item)">
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
  name: "Vehicles",

  data: function() {
    return {
      headers: [
        { text: "Make", value: "make" },
        { text: "Model", value: "model" },
        { text: "Color", value: "color" },
        { text: "Id for Vehicle Type", value: "vehicleTypeId" },
        { text: "Capacity", value: "capacity" },
        { text: "MPG", value: "mpg" },
        { text: "License State", value: "licenseState" },
        { text: "License Plate", value: "licensePlate" }
      ],
      vehicles: [],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    this.$axios.get("/vehicles").then(response => {
      this.vehicles = response.data.map(vehicle => ({
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        color: vehicle.color,
        vehicleTypeId: vehicle.vehicleTypeId,
        capacity: vehicle.capacity,
        mpg: vehicle.mpg,
        licenseState: vehicle.licenseState,
        licensePlate: vehicle.licensePlate
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
      const currentVehicle = this.$store.state.currentVehicle;
      if (currentVehicle && currentVehicle.id === item.id) {
        return "currentVehicle";
      }
    },

    // Update vehicle information.
    updateVehicle(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      this.showSnackbar("Sorry, update is not yet implemented.");
    },

    // Delete an vehicle.
    deleteVehicle(item) {
      this.$axios.delete(`/vehicles/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local vehicle
          // by filtering the deleted vehicle from the list of vehicles.
          this.vehicles = this.vehicles.filter(
            vehicle => vehicle.id !== item.id
          );
        }
      });
    }
  }
};
</script>

<style>
.currentVehicle {
  background: lightcoral;
}
</style>
