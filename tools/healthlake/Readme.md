# Curie Store
This tool is based on static-dicomweb, and is designed to uplaod DICOM part 10 files to a Curie data store, run the curie generation on it, and then download the results to a local static-dicomweb service.  The local files can then be indexed and used to generate/update DICOMweb servers.

## Command Options

* curiestore import <dir-name>     (runs upload, process, download, index)
* curiestore upload <dir-name>     - uploads the directory name to the S3 destination specified - all as a single directory
* curiestore process <dir-name>    - runs a curie import job on the given process
* curiestore download <job-id>     - downloads the given job id data, and creates studies.json, metadataTree.json and image files
* curiestore index   - updates the index in the dicomweb format on the remote dicomweb index system (might have different index types in the future)

## Upload
The upload process simply scans the provided directory, and uploads it to the directory specified, all as flat files.

## Process
The process operation initiates the curie processing, and waits until done, outputting the metadata files localling, and updating the index with the job id for fetching.

## Download
The download operation downloads the metadata files locally, and updates the studies.json file with information from it, and then downloads all the htj2k data.

## index
The index operation goes over all the studies.json files located in the dicomweb directory and writes out a global index.json file containing each of the indexed data items.  Synonym for mkdicomweb index.

## Design
The basic design is just a script that performs each of the operations.
