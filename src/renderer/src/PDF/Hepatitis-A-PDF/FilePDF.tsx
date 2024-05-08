import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
import ImgLogo from '@/renderer/src/assets/img/Imagen2.png'

interface IPatients {
  name: string
  age: number
  doctor: string
  date: string
}

const Header: React.FC = () => {
  const patientInfo: IPatients = {
    name: 'Israel Montiel Dominguez',
    age: 23,
    doctor: 'Jose Luis Peréz Hernandez',
    date: '21 de abril del 2024'
  }

  return (
    <View fixed>
      <View
        style={{
          flexDirection: 'row',
          height: 90
        }}
      >
        <View style={styles.headerComponent}>
          <View style={styles.titleContent}>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.textTitle]}>LABORATORIO</Text>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={[styles.textTitle, { fontSize: 40, marginTop: 4, marginLeft: 6 }]}>
                &quot;ELISA&quot;
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 5, alignItems: 'center' }}>
            <Text style={styles.secondText}>ANÁLISIS CLÍNICOS A TU SERVICIO</Text>
          </View>

          <View style={{ marginLeft: 25, marginTop: 10, flexDirection: 'row' }}>
            <View style={{ marginRight: 20 }}>
              <Text style={styles.textUserInfo}>{`PACIENTE:  ${patientInfo.name}`}</Text>
              <Text style={styles.textUserInfo}>{`DOCTOR (A):  ${patientInfo.doctor}`}</Text>
            </View>
            <View>
              <Text style={styles.textUserInfo}>{`EDAD:  ${patientInfo.age} años`}</Text>
              <Text style={styles.textUserInfo}>{`FECHA:  ${patientInfo.date}`}</Text>
            </View>
          </View>
        </View>
        <View>
          <Image style={{ height: 90, width: 90 }} source={ImgLogo} />
        </View>
      </View>
      <View
        style={{ height: 3, backgroundColor: '#4472c4', marginVertical: 20, marginHorizontal: 8 }}
      ></View>
    </View>
  )
}

export const FooterContent: React.FC = () => {
  return (
    <View style={styles.FooterPage} fixed>
      <View>
        <View>
          <Text style={styles.textFooter}>Verificado y validado por:</Text>
          <Text style={styles.textFooter}>QFB María Cristina Cano Perez</Text>
          <Text style={styles.textFooter}>Cedula Profesional 3655756</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
          <Text style={styles.textFooterContac}>Registro sanitario 1830077536x1288 SSA</Text>
          <Text style={styles.textFooterContac}>TEL. 2781139811, 2787324019</Text>
        </View>
      </View>
    </View>
  )
}

export const FilePDF: React.FC = () => (
  <Document>
    <Page size={'A4'} style={styles.body}>
      <Header />

      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>ESTUDIO</Text>
          <Text style={styles.headerCell}>RESULTADO</Text>
          <Text style={styles.headerCell}>VALOR DE REFERENCIA</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataCell}>{`Hepatitis 'A'`}</Text>
          <Text style={styles.dataCell}>{'Negativo'}</Text>
          <Text style={styles.dataCell}>{'Negativo'}</Text>
        </View>
      </View>

      <FooterContent />
    </Page>
  </Document>
)

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
})

const styles = StyleSheet.create({
  body: {
    paddingTop: 10,
    paddingBottom: 95,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100
  },
  header: {
    fontSize: 12,
    marginBottom: 50,
    textAlign: 'center',
    color: '#000',
    backgroundColor: 'red',
    height: 100
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
    margin: 10
  },
  //Add Header styles
  headerComponent: {
    fontSize: 12,
    marginBottom: 50,
    textAlign: 'center',
    height: 100,
    width: '75%'
  },
  titleContent: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 0,
    margin: 0
  },
  textTitle: {
    color: '#0070c0',
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondText: {
    color: '#0070c0',
    fontFamily: 'Times-Roman',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center'
  },
  textUserInfo: {
    color: '#002060',
    fontFamily: 'Times-Roman',
    fontSize: 12
  },
  textFooter: {
    color: '#002060',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textFooterContac: {
    color: '#002060',
    fontSize: 12
  },
  FooterPage: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey'
  },
  // More styles
  container: {
    borderWidth: 0, // Hacer que el borde de la tabla sea invisible
    marginBottom: 5,
    marginHorizontal: 10
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent' // Hacer que el fondo de la fila de encabezado sea transparente
  },
  headerCell: {
    flex: 1,
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#002060',
    fontSize: 10
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 0
  },
  dataCell: {
    flex: 1,
    padding: 2,
    textAlign: 'left',
    color: '#002060',
    fontSize: 10
  }
})
