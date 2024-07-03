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
            <View style={styles.resultHeaderCell}>
              <Text style={styles.resultHeaderText}>RESULTADO</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: '#111',
                    marginRight: 0.4,
                    fontSize: 8,
                    textAlign: 'center'
                  }}
                >
                  {'DENTRO DE \n REFERENCIA'}
                </Text>
                <Text style={{ flex: 1, fontSize: 8, textAlign: 'center' }}>
                  {'FUERA DE \n REFERENCIA'}
                </Text>
              </View>
            </View>
            <Text style={styles.unitCell}>UNIDADES</Text>
            <Text style={styles.referenceCell}>VALOR DE REFERENCIA</Text>
          </View>
          {testResults!.map((row, index) => (
            <View key={index} style={styles.dataRow}>
              <Text style={styles.dataCellExamName}>{row.contentsDTO?.name}</Text>
              <View style={styles.dataCell}>
                <View style={{ flexDirection: 'column' }}>
                  {row.contentsDTO?.referencesDTO.map((reference, idx) => {
                    const resultValue = parseFloat(row.resultValue.toString())
                    const maxValue = parseFloat(reference.vmax.toString())
                    const minValue = parseFloat(reference.vmin.toString())

                    const isWithinRange = resultValue >= minValue && resultValue <= maxValue

                    return (
                      <View key={idx} style={{ flexDirection: 'row' }}>
                        {isWithinRange ? (
                          <Text style={styles.textCompare}>{resultValue}</Text>
                        ) : (
                          <Text style={styles.textCompare}>{'---'}</Text>
                        )}

                        <Text style={styles.textCompare}>
                          {isWithinRange ? '---' : resultValue}
                        </Text>
                      </View>
                    )
                  })}
                </View>
                ;
              </View>
              <Text style={styles.unitCell}>
                {row.contentsDTO?.units === null ? '' : row.contentsDTO?.units}
              </Text>
              <View style={styles.referenceCell}>
                {row.contentsDTO?.referencesDTO.map((reference, idx) => (
                  <Text key={idx}>
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
    borderBottomWidth: 1,
    borderBottomColor: '#111'
  },
  textUserInfo: {
    color: '#002060',
    fontWeight: 'bold',
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
  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  headerCell: {
    flex: 1,
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    fontSize: 10
  },
  resultHeaderCell: {
    flex: 1.5, // Ajustar según sea necesario para alinear con el header
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    fontSize: 10
  },
  resultHeaderText: {
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 2
  },
  unitCell: {
    flex: 0.5,
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    fontSize: 10
  },
  referenceCell: {
    flex: 1.5,
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    fontSize: 10
  },
  dataRow: {
    flexDirection: 'row'
    // borderBottomWidth: 1,
    // borderBottomColor: '#111'
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
  },
  textCompare: {
    flex: 1,
    marginBottom: 0.4,
    textAlign: 'center'
  }
})
