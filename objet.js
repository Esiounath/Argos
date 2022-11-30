
const user = Object {
  "accuracy": null,
  "contact_line_number": null,
  "created_at": "2022-04-25 11:33:16",
  "description": null,
  "event_type": Object {
    "id": 154,
    "map": Object {
      "groups": Array [
        Object {
          "id": 56,
        },
        Object {
          "id": 3,
        },
        Object {
          "id": 1,
        },
        Object {
          "id": 57,
        },
        Object {
          "id": 58,
        },
      ],
      "id": 39,
      "name": "Alertes : La Chapelle-sur-Erdre",
    },
    "map_id": 39,
    "name": "menace / insulte / intimidation",
    "picto": "https://secure.argos-network.com/uploads/event_type_img/3/0-action3.png",
    "type": 0,
  },
  "event_type_id": 154,
  "id": 1346,
  "imei": "btn1",
  "latitude": "48.80033088",
  "line_number": null,
  "longitude": "2.62662300",
  "photo": null,
  "title": null,
  "triggered_at": "2022-04-26 00:00:00",
  "updated_at": "2022-04-25 11:33:16",
  "user": Object {
    "email": "adelino.deabreu@kafein-studio.fr",
    "first_name": "Adelino",
    "id": 167,
    "last_name": "De Abreu",
    "username": "kafeinchapelle",
  },
  "user_id": 167,
}
const names = Object.keys(user)
    .filter((key) => key.includes("Name"))
    .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: user[key]
        });
  }, {});

console.log(Object.keys(names));
