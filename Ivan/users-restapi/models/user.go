package models

import "gopkg.in/mgo.v2/bson"

//User
type User struct {
	ID       bson.ObjectId `bson:"_id" json:"id"`
	Name     string        `bson:"name" json:"name"`
	Email    string        `bson:"email" json:"email"`
	Avatar   string        `bson:"avatar" json:"avatar"`
	Password string        `bson:"password" json:"password"`
}

/*
func (c User) Validate() error {
	return validation.ValidateStruct(&c,
		// Name cannot be empty, and the length must be between 5 and 20.
		validation.Field(&c.Ṕassword, validation.Required, validation.Length(5, 20)),
		// Gender is optional, and should be either "Female" or "Male".
		validation.Field(&c.Name, validation.Required, is.Name),
		// Validate Address using its own validation rules
		validation.Field(&c.Email, validation.Required, is.Email),
		// Validate Address using its own validation rules
	)
}
*/
