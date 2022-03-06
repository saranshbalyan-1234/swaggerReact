import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./TopLevel/Header";
import Info from "./TopLevel/Info";
import Settings from "./TopLevel/Settings";
import "antd/dist/antd.css";
import Tag from "./Tag";
import Model from "./Model/Model";
export default function Swagger({ basePath, setBasePath }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(basePath).then((res) => {
      setData({
        openapi: "3.0.0",
        info: {
          title: "Blood Bank API",
          version: "v1",
        },
        servers: [
          {
            url: "/api",
            description: "Demo API Server",
          },
        ],
        paths: {
          "/login": {
            post: {
              tags: ["User"],
              summary: "Login",
              description: "Returns User Credentials",
              requestBody: {
                description: "Provide auth credentials",
                required: true,
                content: {
                  "application/json": {
                    schema: {
                      properties: {
                        email: {
                          type: "string",
                          example: "admin@admin.com",
                        },
                        password: {
                          type: "string",
                          example: "admin",
                        },
                      },
                      type: "object",
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          loginData: {
                            type: "object",
                            example:
                              "id: 1,name:saransh, email:admin@admin.com, age:22, address:e-15, city:delhi,state: delhi, gender:male, phone:123, blood_type:A+, token: token",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [],
            },
          },
          "/register": {
            post: {
              tags: ["User"],
              summary: "Register",
              description: "Returns User Data",
              requestBody: {
                description: "Provide provide all details",
                required: true,
                content: {
                  "application/json": {
                    schema: {
                      properties: {
                        name: {
                          type: "string",
                          example: "admin.com",
                        },
                        email: {
                          type: "string",
                          example: "admin@admin.com",
                        },
                        password: {
                          type: "string",
                          example: "admin",
                        },
                        age: {
                          type: "integer",
                          example: 18,
                        },
                        gender: {
                          type: "string",
                          example: "male",
                        },
                        address: {
                          type: "string",
                          example: "address",
                        },
                        state: {
                          type: "string",
                          example: "Delhi",
                        },
                        city: {
                          type: "string",
                          example: "delhi",
                        },
                        phone: {
                          type: "integer",
                          example: 987654321,
                        },
                        blood_type: {
                          type: "string",
                          example: "A+",
                        },
                      },
                      type: "object",
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          registerData: {
                            type: "object",
                            example:
                              "id: 1,name:admin, email:admin@admin.com, age:22, address:e-15, city:delhi,state: delhi, gender:male, phone:123, blood_type:A+",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [],
            },
          },
          "/logout": {
            post: {
              tags: ["User"],
              summary: "Logout",
              description: "Logout current user",
              requestBody: {
                description: "No parameter required",
                required: false,
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          logoutData: {
                            type: "object",
                            example: "Successfully Logged Out",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/update": {
            post: {
              tags: ["User"],
              summary: "Update User Details",
              description: "Returns User Data",
              requestBody: {
                description:
                  "Provide provide only parameter you want to update,",
                required: false,
                content: {
                  "application/json": {
                    schema: {
                      properties: {
                        id: {
                          type: "integer",
                          example: 1,
                        },
                        name: {
                          type: "string",
                          example: "admin.com",
                        },
                        email: {
                          type: "string",
                          example: "admin@admin.com",
                        },
                        password: {
                          type: "string",
                          example: "admin",
                        },
                        age: {
                          type: "integer",
                          example: 18,
                        },
                        gender: {
                          type: "string",
                          example: "male",
                        },
                        address: {
                          type: "string",
                          example: "address",
                        },
                        state: {
                          type: "string",
                          example: "Delhi",
                        },
                        city: {
                          type: "string",
                          example: "delhi",
                        },
                        phone: {
                          type: "integer",
                          example: 987654321,
                        },
                        blood_type: {
                          type: "string",
                          example: "A+",
                        },
                        oldPassword: {
                          type: "string",
                          example: "123",
                        },
                        newPassword: {
                          type: "string",
                          example: "1234",
                        },
                      },
                      type: "object",
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          updatedData: {
                            type: "object",
                            example:
                              "id: 1,name:admin, email:admin@admin.com, age:22, address:e-15, city:delhi,state: delhi, gender:male, phone:123, blood_type:A+",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/findDonors": {
            post: {
              tags: ["Donor"],
              summary: "Get Donors",
              description:
                "Get all donors, get donors by State, City, Blood Group",
              requestBody: {
                description:
                  "Provide only parameters to search, except enter 'all'",
                required: false,
                content: {
                  "application/json": {
                    schema: {
                      properties: {
                        state: {
                          type: "string",
                          example: "All",
                        },
                        city: {
                          type: "string",
                          example: "All",
                        },
                        blood_type: {
                          type: "string",
                          example: "All",
                        },
                      },
                      type: "object",
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          donorsData: {
                            type: "object",
                            example:
                              "[{id: 1,name:admin, email:admin@admin.com, age:22, address:e-15, city:delhi,state: delhi, gender:male, phone:123, blood_type:A+}]",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/getUserById": {
            post: {
              tags: ["User"],
              summary: "Get Donors",
              description:
                "Get all donors, get donors by State, City, Blood Group",
              requestBody: {
                description:
                  "Provide only parameters to search, except enter 'all'",
                required: false,
                content: {
                  "application/json": {
                    schema: {
                      properties: {
                        id: {
                          type: "integer",
                          example: 1,
                        },
                      },
                      type: "object",
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          usersData: {
                            type: "object",
                            example:
                              "[{id: 1,name:admin, email:admin@admin.com, age:22, address:e-15, city:delhi,state: delhi, gender:male, phone:123, blood_type:A+}]",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/getAllBloodType": {
            post: {
              tags: ["Donor"],
              summary: "Get All Blood Type",
              description: "Get all blood Type",
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          bloodTypeData: {
                            type: "object",
                            example:
                              "[A+,A-,A1+,A1-,A1B+,A1B-,A2+,A2-,A2B+,A2B-,AB+,AB-,B+,B-,Bombay Blood Group,INRA,O+,O-]",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/getAllCountries": {
            post: {
              tags: ["Geographical"],
              summary: "Get all countries",
              description: "Returns All Countries Data",
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        example: "[{id: 1,name:India, phonecode:+91}]",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/getAllStatesByCountry": {
            post: {
              tags: ["Geographical"],
              summary: "Get all States By Country",
              description: "Returns all States Data",
              requestBody: {
                description: "Please Provide country_id",
                required: false,
                content: {
                  "application/json": {
                    schema: {
                      properties: {
                        country_id: {
                          type: "integer",
                          example: 101,
                        },
                      },
                      type: "object",
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        example: "[{id: 1,name:Delhi, country_id:101}]",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/getAllCityByStates": {
            post: {
              tags: ["Geographical"],
              summary: "Get all City By States",
              description: "Returns all States Data",
              requestBody: {
                description: "Please Provide state",
                required: false,
                content: {
                  "application/json": {
                    schema: {
                      properties: {
                        state_id: {
                          type: "integer",
                          example: 4021,
                        },
                      },
                      type: "object",
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        example:
                          "[{id: 1,name:West Delhi, state_id,:4021, country_id:101}]",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/getAllNotification": {
            post: {
              tags: ["Notification"],
              summary: "Get all notifications",
              description: "Returns All Notification",
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          notificationData: {
                            type: "object",
                            example:
                              "[{id:1, title:notification, description:description, read_exists:true}]",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                          total_notification_count: {
                            type: "integer",
                            example: 2,
                          },
                          unread_notification_count: {
                            type: "integer",
                            example: 1,
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/readNotification": {
            post: {
              tags: ["Notification"],
              summary: "Read Notification",
              description: "Read notification by notificatio_id",
              requestBody: {
                description: "Please provide notification_id",
                required: false,
                content: {
                  "application/json": {
                    schema: {
                      properties: {
                        notification_id: {
                          type: "integer",
                          example: 1,
                        },
                      },
                      type: "object",
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          notificationData: {
                            type: "object",
                            example: "{id: 1,user_id:1, notification_id:1}",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/addNotification": {
            post: {
              tags: ["Notification"],
              summary: "Add New Notification",
              description: "Add new Notification to table!",
              requestBody: {
                description: "Please provide title and description only",
                required: false,
                content: {
                  "application/json": {
                    schema: {
                      properties: {
                        title: {
                          type: "string",
                          example: "title",
                        },
                        description: {
                          type: "string",
                          example: "description",
                        },
                      },
                      type: "object",
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          notificationData: {
                            type: "object",
                            example:
                              "{id: 1,title:title, description:description}",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/addFeed": {
            post: {
              tags: ["Feed"],
              summary: "Add New Feed",
              description: "Add new Feed to table!",
              requestBody: {
                description:
                  "Please provide title, description and img. img is not necessary",
                required: false,
                content: {
                  "application/json": {
                    schema: {
                      properties: {
                        title: {
                          type: "string",
                          example: "title",
                        },
                        description: {
                          type: "string",
                          example: "description",
                        },
                        img: {
                          type: "string",
                          example: "base64string",
                        },
                      },
                      type: "object",
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          feedData: {
                            type: "object",
                            example:
                              "{id: 1,title:title, description:description,img:base64string}",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/getFeedById": {
            post: {
              tags: ["Feed"],
              summary: "Get Feed By Id",
              description: "Get Single Feed Data",
              requestBody: {
                description: "Please provide id only",
                required: false,
                content: {
                  "application/json": {
                    schema: {
                      properties: {
                        id: {
                          type: "integer",
                          example: 1,
                        },
                      },
                      type: "object",
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          feedData: {
                            type: "object",
                            example:
                              "{id: 1,title:title, description:description,img:base64string}",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/getAllFeed": {
            post: {
              tags: ["Feed"],
              summary: "Get all feeds",
              description: "Returns All Feed",
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          feedData: {
                            type: "object",
                            example:
                              "[{id:1, title:title, description:description, img:base64string}]",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/requestDonation": {
            post: {
              tags: ["RequestDonation"],
              summary: "Request donation here",
              description: "Returns request details",
              requestBody: {
                description: "Provide provide all parameters",
                required: false,
                content: {
                  "application/json": {
                    schema: {
                      properties: {
                        name: {
                          type: "string",
                          example: "admin.com",
                        },
                        email: {
                          type: "string",
                          example: "admin@admin.com",
                        },
                        age: {
                          type: "integer",
                          example: 18,
                        },
                        gender: {
                          type: "string",
                          example: "male",
                        },
                        address: {
                          type: "string",
                          example: "address",
                        },
                        state: {
                          type: "string",
                          example: "Delhi",
                        },
                        city: {
                          type: "string",
                          example: "delhi",
                        },
                        phone: {
                          type: "integer",
                          example: 987654321,
                        },
                        hospital_name: {
                          type: "string",
                          example: "hospital name",
                        },
                        hospital_address: {
                          type: "string",
                          example: "hospital address",
                        },
                        hospital_state: {
                          type: "string",
                          example: "Delhi",
                        },
                        hospital_city: {
                          type: "string",
                          example: "delhi",
                        },
                        hospital_phone: {
                          type: "integer",
                          example: 987654321,
                        },
                        blood_type: {
                          type: "string",
                          example: "A+",
                        },
                      },
                      type: "object",
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          requestDonorsData: {
                            type: "object",
                            example:
                              "id: 1,name:admin, email:admin@admin.com, age:22, address:e-15, city:delhi,state: delhi, gender:male, phone:123, blood_type:A+, hospital_name:name, hospital_address:address, hospital_city:city, hospital_address:address, hospital_phone:809",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/getAllRequest": {
            post: {
              tags: ["RequestDonation"],
              summary: "Get all Request",
              description: "Returns All Request By User",
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          requestData: {
                            type: "object",
                            example:
                              "[{id: 1,name:admin, email:admin@admin.com, age:22, address:e-15, city:delhi,state: delhi, gender:male, phone:123, blood_type:A+, hospital_name:name, hospital_address:address, hospital_city:city, hospital_address:address, hospital_phone:809}]",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
          "/findRequest": {
            post: {
              tags: ["RequestDonation"],
              summary: "Find All User Request",
              description:
                "Get all Request, get donors by State, City, Blood Group",
              requestBody: {
                description:
                  "Provide only parameters to search, except enter 'all'",
                required: false,
                content: {
                  "application/json": {
                    schema: {
                      properties: {
                        state: {
                          type: "string",
                          example: "All",
                        },
                        city: {
                          type: "string",
                          example: "All",
                        },
                        hospital_state: {
                          type: "string",
                          example: "All",
                        },
                        hospital_city: {
                          type: "string",
                          example: "All",
                        },
                        blood_type: {
                          type: "string",
                          example: "All",
                        },
                      },
                      type: "object",
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: "Success Response",
                  content: {
                    "application/json": {
                      schema: {
                        properties: {
                          requestData: {
                            type: "object",
                            example:
                              "[{id: 1,name:admin, email:admin@admin.com, age:22, address:e-15, city:delhi,state: delhi, gender:male, phone:123, blood_type:A+, hospital_name:name, hospital_address:address, hospital_city:city, hospital_address:address, hospital_phone:809}]",
                          },
                          status: {
                            type: "string",
                            example: "success",
                          },
                        },
                        type: "object",
                      },
                    },
                  },
                },
              },
              security: [
                {
                  sanctum: [],
                },
              ],
            },
          },
        },
        tags: [
          {
            name: "User",
            description: "All user related API",
          },
          {
            name: "Donor",
            description: "All Donor related API",
          },
          {
            name: "RequestDonation",
            description: "All request related API",
          },
          {
            name: "Geographical",
            description: "Geographical related API",
          },
          {
            name: "Notification",
            description: "Notification related API",
          },
          {
            name: "Feed",
            description: "Feeds related API",
          },
        ],
        components: {
          securitySchemes: {
            sanctum: {
              type: "apiKey",
              description: "Enter token in format (Bearer <token>)",
              name: "Authorization",
              in: "header",
            },
          },
        },
        security: {
          sanctum: [],
          0: [],
        },
      });
    });
    console.log("definitions", data.definitions);
  }, [basePath]);

  return (
    <div id="swagger-ui">
      <section
        className="swagger-ui swagger-container"
        style={{ marginBottom: "100px" }}
      >
        <Header basePath={basePath} setBasePath={setBasePath} />
        <Info basePath={basePath} />
        <Settings servers={data.servers} schemes={data.schemes} />
        {data.tags &&
          data.tags.map((el) => {
            return (
              <Tag
                key={el}
                tag={el}
                paths={data.paths}
                models={data.definitions}
              />
            );
          })}
        <Model data={data.definitions} />
        <div style={{ height: "10px" }}></div>
      </section>
    </div>
  );
}
