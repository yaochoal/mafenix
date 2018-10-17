// Importaciones
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import graphql from '../utils/graphQLUtils';

export default class Records extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }


    componentDidMount() {
        let request = `
        query{
          prestamosbyUser(token: "${userToken}"){
            id
            student_id
            bici_id
            solicitud
          }
        }`;


        graphql(
            request,
            (data) => {
                this.setState({
                    isLoading: false,
                    dataSource: data.prestamosbyUser.map((prestamo, i) => ({
                        solicitud: prestamo.solicitud,
                        key: `${prestamo.id}`,
                        bici_id: prestamo.bici_id,
                        index: i
                    })),
                });
                console.log(data.prestamosbyUser);
            },
            (status, data) => {
            }
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Historial de Prestamos</Text>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text style={styles.item}> <Prestamo ind={item.index} key={item.key} prestamo={item}/>
                    </Text>}
                />
            </View>
        );
    }
}

class Prestamo extends React.Component {

    constructor(props) {
        super(props);
        let fechaSolicitud = new Date(this.props.prestamo.solicitud);
        this.state = {
            marca: "",
            fecha: fechaSolicitud.toLocaleDateString(),
            hora: fechaSolicitud.toLocaleTimeString(),
            biciSerial: props.prestamo.bici_id,
            biciMarca: ""
        };

        let requestPerfil = `
                query{
                  bicicletaById(token: "${userToken}", serial: ${props.prestamo.bici_id}){
                    marca
                  }
                }`;

        graphql(requestPerfil,
            data => {
                this.setState({biciMarca: data.bicicletaById.marca})
            }
        );

    }

    render() {

        return (
                `# ${this.props.ind + 1} - ${this.state.fecha} (${this.state.hora}) ${this.state.biciMarca}${this.state.biciSerial}`
        )
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#3949ab",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        color: "#fff",
        fontSize: 17,
        marginVertical: 8,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },


});