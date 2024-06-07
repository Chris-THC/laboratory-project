import ImgBackground from '@/renderer/src/assets/img/back.jpg' // Assuming the image path is correct
import { Document, Image, Page, Text, StyleSheet, View } from '@react-pdf/renderer'
import { ClientsInterface } from '@renderer/interfaces/clients/clients'
import React from 'react'

interface PropsFilePDF {
  customerInfo: ClientsInterface | null | undefined
  currentDate: string
}

export const FilePDF: React.FC<PropsFilePDF> = ({ customerInfo, currentDate }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image fixed src={ImgBackground} style={styles.backgroundImage} />

        <View fixed style={styles.customerLayaud}>
          <View style={styles.userInfoSection}>
            <Text style={styles.textUserInfo}>{`PACIENTE:  ${customerInfo!.name}`}</Text>
            <Text style={styles.textUserInfo}>{`EDAD:  ${customerInfo!.age} años`}</Text>
            <Text style={styles.textUserInfo}>{`DOCTOR (A):  ${customerInfo!.doctorName}`}</Text>
            <Text style={styles.textUserInfo}>{`FECHA:  ${currentDate}`}</Text>
          </View>
        </View>

        <View style={styles.tableInfo}>
          {Array.from({ length: 50 }).map((_, index) => (
            <Text key={index}>Test</Text>
          ))}
        </View>

        <View fixed style={styles.footerContent}></View>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    position: 'relative'
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  customerLayaud: {
    marginBottom: 2,
    flexDirection: 'row',
    height: 210
  },
  userInfoSection: {
    flexDirection: 'column',
    height: 80,
    top: 120,
    left: 228
  },
  textUserInfo: {
    color: '#002060',
    fontFamily: 'Times-Roman',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 2
  },
  tableInfo: {
    backgroundColor: 'orange',
    flex: 1
  },
  footerContent: {
    height: 180
  }
})
