import ImgBackground from '@/renderer/src/assets/img/back.jpg' // Assuming the image path is correct
import { Document, Image, Page, Text, StyleSheet, View } from '@react-pdf/renderer'
import { ClientsInterface } from '@renderer/interfaces/clients/clients'
import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import React from 'react'

interface PropsFilePDF {
  customerInfo: ClientsInterface | null | undefined
  currentDate: string
  testResults: ContentsResultsInterface[] | null | undefined
}

export const FilePDF: React.FC<PropsFilePDF> = ({ customerInfo, currentDate, testResults }) => {
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

        <View style={styles.tableInfo}>
          <View fixed style={styles.headerRow}>
            <Text style={styles.headerCell}>ESTUDIO</Text>
            <View style={styles.headerCell}>
              <View>
                <View style={{ flexDirection: 'column' }}>
                  <Text>RESULTADO</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      flex: 1,
                      borderRight: '1px solid #111',
                      marginRight: 0.4,
                      fontSize: 9
                    }}
                  >
                    DENTRO DE REFERENCIA
                  </Text>
                  <Text style={{ flex: 1, fontSize: 9 }}>FUERA DE REFERENCIA</Text>
                </View>
              </View>
            </View>
            <Text style={styles.unitCell}>UNIDADES</Text>
            <Text style={styles.referenceCell}>VALOR DE REFERENCIA</Text>
          </View>
          {testResults!.map((row, index) => (
            <View key={index} style={styles.dataRow}>
              <Text style={styles.dataCellExamName}>{row.contentsDTO?.name}</Text>
              <View style={styles.dataCell}>
                <View style={{ flexDirection: 'row' }}>
                  {}
                  <Text style={{ flex: 1, marginRight: 0.4 }}>{row.resultValue}</Text>
                  <Text style={{ flex: 1 }}>{'---'}</Text>
                </View>
              </View>
              <Text style={styles.unitCell}>
                {row.contentsDTO?.units === null ? '' : row.contentsDTO?.units}
              </Text>

              <View style={styles.referenceCell}>
                {row.contentsDTO?.referencesDTO.map((reference, index) => (
                  <Text key={index}>
                    {`${reference.vrefText === null ? '' : reference.vrefText} ${reference.vmin === null ? '' : reference.vmin} - ${reference.vmax === null ? '' : reference.vmax}`}
                  </Text>
                ))}
              </View>
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
  // headerRow: {
  //   flexDirection: 'row',
  //   backgroundColor: 'transparent'
  // },
  // headerCell: {
  //   flex: 1,
  //   paddingBottom: 5,
  //   fontWeight: 'extrabold',
  //   textAlign: 'center',
  //   color: '#000',
  //   fontSize: 10
  // },
  // dataRow: {
  //   flexDirection: 'row',
  //   borderBottomWidth: 0
  // },
  // dataCell: {
  //   flex: 1,
  //   padding: 2,
  //   textAlign: 'center',
  //   color: '#333333',
  //   fontSize: 10,
  //   marginVertical: 2
  // },
  // dataCellExamName: {
  //   flex: 1,
  //   padding: 2,
  //   textAlign: 'left',
  //   color: '#333333',
  //   fontSize: 10,
  //   marginLeft: 5,
  //   marginVertical: 2
  // },

  // Otros estilos
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
  unitCell: {
    flex: 0.5, // Reduce el tamaño de la celda de UNIDADES
    paddingBottom: 5,
    fontWeight: 'extrabold',
    textAlign: 'center',
    color: '#000',
    fontSize: 10
  },
  referenceCell: {
    flex: 1.5, // Aumenta el tamaño de la celda de VALOR DE REFERENCIA
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
