import ImgBackground from '@/renderer/src/assets/img/back.jpg' // Assuming the image path is correct
import { Document, Image, Page, Text, StyleSheet, View } from '@react-pdf/renderer'
import { ClientsInterface } from '@renderer/interfaces/clients/clients'
import React from 'react'

interface PropsFilePDF {
  customerInfo: ClientsInterface | null | undefined
  currentDate: string
}
interface InterfacelinicalAnalysis {
  study_name: string
  result: string
  reference_value: string
  units: string
}

export const FilePDF: React.FC<PropsFilePDF> = ({ customerInfo, currentDate }) => {
  const analysisData: InterfacelinicalAnalysis[] = [
    {
      study_name: 'Glucosa',
      result: '65',
      reference_value: '60 a 110 mg/dL',
      units: 'mg/dL'
    },
    {
      study_name: 'Urea',
      result: '20',
      reference_value: '15 a 45 mg/dL',
      units: 'mg/dL'
    },
    {
      study_name: 'Glucosa',
      result: '65',
      reference_value: '60 a 110 mg/dL',
      units: 'mg/dL'
    },
    {
      study_name: 'Urea',
      result: '20',
      reference_value: '15 a 45 mg/dL',
      units: 'mg/dL'
    },
    {
      study_name: 'Glucosa',
      result: '65',
      reference_value: '60 a 110 mg/dL',
      units: 'mg/dL'
    }
  ]

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image fixed src={ImgBackground} style={styles.backgroundImage} />

        <View fixed style={styles.customerLayaud}>
          <View style={styles.userInfoSection}>
            <Text style={styles.textUserInfo}>{`PACIENTE:  ${customerInfo!.name.toUpperCase()}`}</Text>
            <Text style={styles.textUserInfo}>{`EDAD:  ${customerInfo!.age} AÑOS`}</Text>
            <Text style={styles.textUserInfo}>{`DOCTOR (A):  ${customerInfo!.doctorName.toUpperCase()}`}</Text>
            <Text style={styles.textUserInfo}>{`FECHA:  ${currentDate}`}</Text>
          </View>
        </View>

        <View style={styles.tableInfo}>
          <View fixed style={styles.headerRow}>
            <Text style={styles.headerCell}>ESTUDIO</Text>
            <View style={styles.headerCell}>
              <View>
                <View style={{ flexDirection: 'column' }}>
                  <Text>RESULTADO</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1 }}>DENTRO DE LA REFERENCIA</Text>
                  <Text style={{ flex: 1 }}>FUERA DE LA REFERENCIA</Text>
                </View>
              </View>
            </View>
            <Text style={styles.headerCell}>UNIDADES</Text>
            <Text style={styles.headerCell}>VALOR DE REFERENCIA</Text>
          </View>
          {analysisData.map((row, index) => (
            <View key={index} style={styles.dataRow}>
              <Text style={styles.dataCellExamName}>{row.study_name}</Text>
              <View style={styles.dataCell}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1 }}>{row.result}</Text>
                  <Text style={{ flex: 1 }}>{'---'}</Text>
                </View>
              </View>
              <Text style={styles.dataCell}>{row.units}</Text>
              <Text style={styles.dataCell}>{row.reference_value}</Text>
            </View>
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
    borderBottom: '1px solid #111'
  },
  textUserInfo: {
    color: '#002060',
    fontWeight: 'extrabold',
    fontSize: 11,
    marginTop: 1,
    marginBottom: 2
  },
  tableInfo: {
    flex: 1,
    marginHorizontal: 8
  },
  footerContent: {
    height: 180
  },
  // Table section
  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  headerCell: {
    flex: 1,
    paddingBottom: 5,
    fontWeight: 'extrabold',
    textAlign: 'center',
    color: '#000',
    fontSize: 10
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 0
  },
  dataCell: {
    flex: 1,
    padding: 2,
    textAlign: 'center',
    color: '#333333',
    fontSize: 10,
    marginVertical: 2
  },
  dataCellExamName: {
    flex: 1,
    padding: 2,
    textAlign: 'left',
    color: '#333333',
    fontSize: 10,
    marginLeft: 5,
    marginVertical: 2
  }
})
