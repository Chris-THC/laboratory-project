import ImgBackground from '@/renderer/src/assets/img/back.jpg' // Assuming the image path is correct
import { Document, Image, Page, Text, StyleSheet, View } from '@react-pdf/renderer'
import { ClientsInterface } from '@renderer/interfaces/clients/clients'
import React from 'react'

interface PropsFilePDF {
  customerInfo: ClientsInterface | null | undefined
  currentDate: string
}

export const TestFilePDF: React.FC<PropsFilePDF> = ({ customerInfo, currentDate }) => {
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

        <View style={styles.mainContent}>
          {Array.from({ length: 50 }).map((_, index) => (
            <Text key={index}>Test</Text>
          ))}
        </View>

        <View fixed style={styles.footerInfo}>
          <View style={{ flexDirection: 'column', height: 80 }}>
            <Text style={styles.textUserInfo}>{`PACIENTE:  ${customerInfo!.name}`}</Text>
            <Text style={styles.textUserInfo}>{`EDAD:  ${customerInfo!.age} años`}</Text>
            <Text style={styles.textUserInfo}>{`DOCTOR (A):  ${customerInfo!.doctorName}`}</Text>
            <Text style={styles.textUserInfo}>{`FECHA:  ${currentDate}`}</Text>
          </View>
        </View>
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
    width: '100%',
    height: '100%'
  },
  customerInfo: {
    position: 'absolute',
    top: 120,
    left: 230
  },
  footerInfo: {
    position: 'absolute',
    top: 500,
    left: 0
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
  mainContent: {
    flexGrow: 1,
    margin: '200px 0 20px 0', // Ajusta los márgenes según sea necesario
    backgroundColor: 'red'
  }
})
