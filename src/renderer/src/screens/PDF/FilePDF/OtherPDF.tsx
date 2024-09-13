import ImgBackground from '@/renderer/src/assets/img/back2.jpg' // Assuming the image path is correct
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { ClientsInterface } from '@renderer/interfaces/clients/clients'
import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import React from 'react'

interface PropsFilePDF {
  customerInfo: ClientsInterface | null | undefined
  currentDate: string
  testResults: ContentsResultsInterface[] | null | undefined
}

export const OtherPDF: React.FC<PropsFilePDF> = ({ customerInfo, currentDate, testResults }) => {
  console.info(JSON.stringify(testResults, null, 2))

  return (
    <Document>
      <Page size="A4" style={{ position: 'relative' }}>
        <Image fixed src={ImgBackground} style={styles.backgroundImage} />
        <View style={styles.headerContainer}>
          <View style={styles.customerContainer}>
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

        <View style={styles.tableContainer}>
          <View style={styles.headerTable}>
            <View style={{ width: 140, borderWidth: 1, borderColor: '#000' }}>
              <Text style={styles.textHeader}>ESTUDIO</Text>
            </View>

            <View style={[styles.headerTableCont, { width: 140 }]}>
              <View>
                <Text style={styles.textHeader}>RESULTADO</Text>
              </View>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={styles.referenceStyles}>
                  <Text style={{ fontSize: 9 }}>{'DENTRO DE \n REFERENCIA'}</Text>
                </View>
                <View style={styles.referenceStyles}>
                  <Text style={{ fontSize: 9 }}>{'FUERA DE \n REFERENCIA'}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.headerTableCont, { width: 55 }]}>
              <Text style={styles.textHeader}>UNIDADES</Text>
            </View>

            <View style={[styles.headerTableCont, { width: 230 }]}>
              <Text style={styles.textHeader}>VALOR DE REFERENCIA</Text>
            </View>
          </View>

          {testResults!.map((test, index) => {
            return (
              <View key={index} style={styles.bodyTable}>
                <View
                  style={{ width: 140, borderWidth: 1, borderColor: '#000', borderTop: 'none' }}
                >
                  <Text style={styles.textHeader}>{test.contentsDTO?.name}</Text>
                </View>

                <View style={[styles.bodyTableCont, { width: 140 }]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <View style={styles.referenceBody}>
                      <Text style={{ fontSize: 9 }}>{'1'}</Text>
                    </View>
                    <View style={styles.referenceBody}>
                      <Text style={{ fontSize: 9 }}>{'0'}</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.bodyTableCont, { width: 55 }]}>
                  <Text style={styles.textHeader}>{test.contentsDTO?.units}</Text>
                </View>

                <View style={[styles.headerTableCont, { width: 230 }]}>
                  {test.contentsDTO?.referencesDTO.map((reference, idx) => (
                    <Text key={idx}>
                      {reference.vrefText
                        ? `${reference.vrefText}`
                        : `${reference.vmin !== null ? reference.vmin : ''} ${reference.vmin !== null && reference.vmax !== null ? '-' : ''} ${reference.vmax !== null ? reference.vmax : ''}`}
                    </Text>
                  ))}
                </View>
              </View>
            )
          })}
        </View>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  headerContainer: {
    borderStyle: 'solid',
    borderWidth: 1,
    height: 220,
    marginHorizontal: 10,
    marginTop: 10
  },
  customerContainer: {
    borderStyle: 'solid',
    borderWidth: 1,
    width: 330,
    height: 'auto',
    borderColor: '#000',
    flexDirection: 'column',
    top: 115,
    left: 240
  },
  textUserInfo: {
    color: '#002060',
    fontWeight: 'bold',
    fontSize: 11,
    paddingVertical: 3,
    paddingLeft: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#111',
    height: 22
  },
  tableContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    height: 'auto'
    // Ojo aqui puede indicarle en donde se va a ubicar el cotainer de la tabla
    // top: 150
  },
  headerTable: {
    marginHorizontal: 10,
    flexDirection: 'row'
  },
  headerTableCont: {
    borderWidth: 1,
    borderColor: '#000',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeft: 'none',
    padding: 0,
    margin: 0
  },
  textHeader: {
    fontSize: 10,
    textAlign: 'center'
  },
  //   seccion de las referencias
  referenceStyles: {
    flex: 1,
    borderRight: 0.5,
    borderColor: '#000',
    borderTop: 1
  },
  // BodyReference
  referenceBody: {
    flex: 1,
    borderRight: 0.5,
    borderColor: '#000',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  bodyTableCont: {
    borderWidth: 1,
    borderColor: '#000',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeft: 'none',
    padding: 0,
    margin: 0,
    borderTop: 'none'
  },
  bodyTable: {
    marginHorizontal: 10,
    flexDirection: 'row',
    height: 20
  }
})
