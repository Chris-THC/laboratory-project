import ImgBackground from '@/renderer/src/assets/img/back.jpg' // Assuming the image path is correct
import { Document, Image, Page, Text, StyleSheet, View } from '@react-pdf/renderer'
import { ClientsInterface } from '@renderer/interfaces/clients/clients'
import React from 'react'

interface PropsFilePDF {
  customerInfo: ClientsInterface | null | undefined
  currentDate: string
}

export const TestFilePDF: React.FC<PropsFilePDF> = ({ customerInfo, currentDate }) => {
  // Generar las filas de datos
  const dataRows = Array.from({ length: 50 }).map((_, index) => (
    <View key={index} style={styles.dataRow}>
      <Text style={styles.dataCell}>{`Hepatitis 'A'`}</Text>
      <Text style={styles.dataCell}>{'Negativo'}</Text>
      <Text style={styles.dataCell}>{'Negativo'}</Text>
    </View>
  ))

  const FooterContent: React.FC = () => {
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

  return (
    <Document>
      <Page size={'A4'} style={styles.body}>
        <Image fixed src={ImgBackground} style={styles.bodyImage} />

        <View fixed style={styles.customerInfo}>
          <View style={{ flexDirection: 'column', height: 80 }}>
            <Text style={styles.textUserInfo}>{`PACIENTE:  ${customerInfo!.name}`}</Text>
            <Text style={styles.textUserInfo}>{`EDAD:  ${customerInfo!.age} años`}</Text>
            <Text style={styles.textUserInfo}>{`DOCTOR (A):  ${customerInfo!.doctorName}`}</Text>
            <Text style={styles.textUserInfo}>{`FECHA:  ${currentDate}`}</Text>
          </View>
        </View>

        <View style={styles.testTable}>
          <View style={styles.container}>
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>ESTUDIO</Text>
              <Text style={styles.headerCell}>RESULTADO</Text>
              <Text style={styles.headerCell}>VALOR DE REFERENCIA</Text>
            </View>
            {dataRows}
          </View>
        </View>

        <FooterContent />
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  body: {
    position: 'relative'
  },
  bodyImage: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    width: '100%'
  },
  customerInfo: {
    position: 'absolute',
    top: 120,
    left: 230
  },
  testTable: {
    marginTop: 223,
    marginLeft: 33,
    marginRight: 33
  },
  textUserInfo: {
    color: '#002060',
    fontFamily: 'Times-Roman',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 2
  },
  headerCell: {
    flex: 1,
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#002060',
    fontSize: 10
  },
  container: {
    borderWidth: 0,
    marginBottom: 5
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent'
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
  textFooter: {
    color: '#002060',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textFooterContac: {
    color: '#002060',
    fontSize: 12
  }
})
