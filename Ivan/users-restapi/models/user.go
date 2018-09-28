package models

import "gopkg.in/mgo.v2/bson"

//User
type User struct {
	ID       bson.ObjectId `json:"id"`
	Name     string        `json:"name"`
	Email    string        `json:"email"`
	Avatar   string        `json:"avatar"`
	Password string        `json:"password"`
}
