document.addEventListener("DOMContentLoaded", async function () {

    const stateSelect = document.getElementById("state");
    const citySelect = document.getElementById("city");

    if (!stateSelect || !citySelect) return;

    try {

        // Load JSON data
        const response = await fetch("data/india-states-cities.json");

        const statesAndCities = await response.json();

        // Populate States
        Object.keys(statesAndCities)
            .sort()
            .forEach(state => {

                const option = document.createElement("option");

                option.value = state;
                option.textContent = state;

                stateSelect.appendChild(option);
            });

        // Initialize Tom Select
        const stateTom = new TomSelect("#state", {
            create: false,
            sortField: {
                field: "text",
                direction: "asc"
            }
        });

        let cityTom = new TomSelect("#city", {
            create: false,
            sortField: {
                field: "text",
                direction: "asc"
            }
        });

        // State Change
        stateSelect.addEventListener("change", function () {

            const selectedState = this.value;

            // Destroy old city select
            cityTom.destroy();

            // Reset city dropdown
            citySelect.innerHTML =
                '<option value="">Select City</option>';

            // Populate Cities
            if (statesAndCities[selectedState]) {

                statesAndCities[selectedState]
                    .sort()
                    .forEach(city => {

                        const option =
                            document.createElement("option");

                        option.value = city;
                        option.textContent = city;

                        citySelect.appendChild(option);
                    });
            }

            // Reinitialize searchable dropdown
            cityTom = new TomSelect("#city", {
                create: false,
                sortField: {
                    field: "text",
                    direction: "asc"
                }
            });
        });

    } catch (error) {

        console.error(
            "Error loading states and cities:",
            error
        );
    }
});