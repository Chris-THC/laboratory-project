import ImgBackground from '@/renderer/src/assets/img/back.jpg' // Assuming the image path is correct
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { ClientsInterface } from '@renderer/interfaces/clients/clients'
import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import React from 'react'

interface PropsFilePDF {
  customerInfo: ClientsInterface | null | undefined
  currentDate: string
  testResults: ContentsResultsInterface[] | null | undefined
}

export const NewFilePDF: React.FC<PropsFilePDF> = ({ customerInfo, currentDate, testResults }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image fixed src={ImgBackground} style={styles.backgroundImage} />

        <View fixed style={styles.customerLayaud}>
          <View style={styles.userInfoSection}>
            <Text
              style={styles.textUserInfo}
            >{`PACIENTE:  ${customerInfo!.name.toUpperCase()}`}</Text>
            <Text style={styles.textUserInfo}>{`EDAD:  ${customerInfo!.age} AÑOS`}</Text>
            <Text
              style={styles.textUserInfo}
            >{`DOCTOR (A):  ${customerInfo!.doctorName.toUpperCase()}`}</Text>
            <Text style={styles.textUserInfo}>{`FECHA:  ${currentDate}`}</Text>
          </View>
        </View>

        {/* <View fixed style={styles.footerContent}></View> */}
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
    flexDirection: 'row',
    height: 210,
    marginBottom: 2
  },
  userInfoSection: {
    flexDirection: 'column',
    height: 80,
    width: 350,
    top: 120,
    left: 228,
    border: 0.5,
    borderBottomColor: '#111'
  },
  textUserInfo: {
    color: '#002060',
    fontWeight: 'bold',
    fontSize: 11,
    marginTop: 1,
    marginBottom: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#111'
  }
})
