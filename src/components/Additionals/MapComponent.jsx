import { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { LocationIcon } from "./Icons/Location";
import "./map.css";
import CenterSwitch from "./CenterSwitch";

export default function MapComponent() {
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const mapInstance = useRef(null);
  const infoWindow = useRef(null);
  const markers = useRef([]);
  const [isSelected, setIsSelected] = useState(true);

  const createMarker = (place, map, infoWindow) => {
    const marker = new window.google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
    });

    window.google.maps.event.addListener(marker, "click", () => {
      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails(
        {
          placeId: place.place_id,
          fields: [
            "name",
            "formatted_address",
            "geometry",
            "rating",
            "opening_hours",
            "formatted_phone_number",
            "website",
          ],
        },
        (placeDetails, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const contentString = `
                <div class="flex flex-col gap-2 text-base-color">
                  <h2 class="text-xl font-bold mb-2 font-motivasans">${
                    placeDetails.name
                  }</h2>
                  <p><strong class="font-bold">Dirección:</strong> ${
                    placeDetails.formatted_address
                  }</p>
                  ${
                    placeDetails.rating
                      ? `<p><strong class="font-bold">Rating:</strong> ${placeDetails.rating}</p>`
                      : ""
                  }
                  ${
                    placeDetails.opening_hours
                      ? `<p><strong class="font-bold">Horario:</strong><br> ${placeDetails.opening_hours.weekday_text.join(
                          "<br>"
                        )}</p>`
                      : ""
                  }
                  ${
                    placeDetails.formatted_phone_number
                      ? `<p><strong class="font-bold">Teléfono:</strong> ${placeDetails.formatted_phone_number}</p>`
                      : ""
                  }
                  ${
                    placeDetails.website
                      ? `<p><strong class="font-bold">Sitio Web:</strong> <a href="${placeDetails.website}" target="_blank" class="text-blue-500 underline">${placeDetails.website}</a></p>`
                      : ""
                  }
                </div>
              `;
            infoWindow.setContent(contentString);
            infoWindow.open(map, marker);
          }
        }
      );
    });

    markers.current.push(marker); // Agregar el nuevo marcador a la lista de marcadores
  };

  const clearMarkers = () => {
    markers.current.forEach((marker) => {
      marker.setMap(null); // Eliminar el marcador del mapa
    });
    markers.current = []; // Vaciar la lista de marcadores
  };

  useEffect(() => {
    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${url}"]`);
        if (!existingScript) {
          const script = document.createElement("script");
          script.src = url;
          script.async = true;
          script.defer = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        } else {
          resolve();
        }
      });
    };

    const initMap = () => {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: -33.4489, lng: -70.6693 }, // Santiago de Chile
        zoom: 15,
        // Personalización de controles
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        rotateControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER,
        },
        streetViewControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        fullscreenControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_TOP,
        },
        rotateControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_BOTTOM,
        },
      });

      infoWindow.current = new window.google.maps.InfoWindow();

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            mapInstance.current.setCenter(pos);

            const service = new window.google.maps.places.PlacesService(
              mapInstance.current
            );
            const request = {
              location: pos,
              radius: "5000", // Radio de búsqueda en metros
              types: ["hospital", "doctor", "clinic"], // Tipos de lugares a buscar
            };

            service.nearbySearch(request, (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                clearMarkers();
                results.forEach((place) => {
                  createMarker(place, mapInstance.current, infoWindow.current);
                });
              }
            });
          },
          () => {
            handleLocationError(
              true,
              infoWindow.current,
              mapInstance.current.getCenter(),
              mapInstance.current
            );
          }
        );
      } else {
        handleLocationError(
          false,
          infoWindow.current,
          mapInstance.current.getCenter(),
          mapInstance.current
        );
      }

      const searchBox = new window.google.maps.places.SearchBox(
        searchRef.current
      );
      mapInstance.current.controls[
        window.google.maps.ControlPosition.TOP_LEFT
      ].push(searchRef.current);

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        const bounds = new window.google.maps.LatLngBounds();
        clearMarkers();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          createMarker(place, mapInstance.current, infoWindow.current);

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        mapInstance.current.fitBounds(bounds);
      });
    };

    const handleLocationError = (
      browserHasGeolocation,
      infoWindow,
      pos,
      map
    ) => {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: El servicio de geolocalización falló."
          : "Error: Tu navegador no soporta geolocalización."
      );
      infoWindow.open(map);
    };

    window.initMap = initMap;

    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDHAqQTQaHnIvXdM3z1jreuzplBe9Ryauk&libraries=places&loading=async&callback=initMap"
    )
      .then(() => {
        if (window.google) {
          window.initMap();
        }
      })
      .catch((error) => {
        console.error("Error loading Google Maps script:", error);
      });
  }, []);

  const searchNearby = (types) => {
    if (!mapInstance.current) return;

    const service = new window.google.maps.places.PlacesService(
      mapInstance.current
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const request = {
            location: pos,
            radius: "5000", // Radio de búsqueda en metros
            types, // Tipo de lugares a buscar
          };

          service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              clearMarkers();
              results.forEach((place) => {
                createMarker(place, mapInstance.current, infoWindow.current);
              });
            }
          });
        },
        () => {
          console.log("Error: El servicio de geolocalización falló.");
        }
      );
    }
  };

  const centerLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          mapInstance.current.setCenter(pos);
          mapInstance.current.setZoom(15);
        },
        () => {
          console.log("Error: El servicio de geolocalización falló.");
        }
      );
    }
  };

  const handleSwitchChange = (selected) => {
    searchNearby(selected ? ["hospital", "doctor", "clinic"] : ["pharmacy"]);
  };

  return (
    <div className="relative h-full">
      <div className="py-5 flex items-center">
        <input
          ref={searchRef}
          type="text"
          placeholder="Buscar por nombre o ubicación"
          className="w-56 sm:w-96 h-[38px] px-4 placeholder:text-base-color-m text-sm text-black p-2 mt-[10px] ms-[10px] rounded-full outline-none ring-0 focus:ring-base-dark-50 focus:shadow-[0_1px_10px_rgba(0,_0,_0,_0.3)] border-0 shadow-[0_1px_4px_rgba(0,_0,_0,_0.3)] transition"
        />
        <div className="flex items-center w-full gap-5">
          <h2 className="text-base sm:text-2xl font-bold text-base-color-h dark:text-base-color-dark">
            Consulta centros de salud o farmacias cercanas
          </h2>
          <CenterSwitch
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            onSwitchChange={handleSwitchChange}
          />
        </div>
      </div>
      <div
        ref={mapRef}
        className="w-full h-96 sm:h-[600px] rounded-xl overflow-hidden shadow-medium !focus:outline-0"
      ></div>
      <button
        title="Centrar"
        className="group flex items-center justify-center absolute top-52 sm:top-72 right-[21px] size-[29px] rounded-lg transform z-50 bg-white shadow-[0_1px_4px_rgba(0,_0,_0,_0.3)]"
        onClick={centerLocation}
      >
        <div className="relative size-full">
          <LocationIcon className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 size-5 text-[#525252] group-hover:text-[#333333]" />
        </div>
      </button>
    </div>
  );
}
